import {Injectable} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable, Subject} from 'rxjs';
import {Course, CourseCreate} from '@app/features/course-feature';
import {filter, map, takeUntil} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';
import {StorageService} from '@app/core';

@Injectable({
  providedIn: 'root',
})
export class CourseFeatureStoreService {
  private COURSE_KEY = 'COURSE_KEY';

  private course$: BehaviorSubject<Course> = new BehaviorSubject<Course>(null);
  private subject$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private firestore: AngularFirestore,
    private storageService: StorageService
  ) {
    this.checkSavedCourseId();
  }

  get course(): Course {
    if (!this.course$.getValue()) {
      throw new Error('trying to access course in CourseFeatureStoreService, but does not exists');
    }

    return this.course$.getValue();
  }

  getCourse(): Observable<Course> {
    return this.course$.asObservable().pipe(filter((x) => !!x));
  }

  setCourse(courseId): void {
    if (this.course$.getValue() && this.course$.getValue().courseId === courseId) {
      return;
    }
    this.subject$.next(true);
    this.getCourseFromFirestore(courseId)
      .pipe(takeUntil(this.subject$))
      .subscribe((res) => {
        this.storageService.saveData(this.COURSE_KEY, res.courseId);
        this.course$.next(res);
      });
  }

  discardCourse(){
    this.course$.next(null);
    this.storageService.removeData(this.COURSE_KEY);
  }

  private checkSavedCourseId() {
    const courseId = this.storageService.getData(this.COURSE_KEY) as string;
    if (courseId) {
      this.setCourse(courseId);
    }
  }

  private getCourseFromFirestore(courseId: string): Observable<Course> {
    return combineLatest([
      this.firestore.collection('courses').doc(courseId).valueChanges(),
      this.firestore.collection('courses').doc(courseId).collection('private').doc('private').valueChanges(),
    ]).pipe(
      map(([coursePublic, coursePrivate]) => {
        return {coursePublic, coursePrivate} as CourseCreate;
      }),
      map((res: CourseCreate) => {
        return {...res.coursePublic, ...res.coursePrivate} as Course;
      })
    );
  }
}
