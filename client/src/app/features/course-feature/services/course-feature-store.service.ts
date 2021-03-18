import {Injectable} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable} from "rxjs";
import {Course} from "../model/courses-firebase.interface";
import {first, map} from "rxjs/operators";
import {CourseCreate} from "../model/course-module.interface";
import {AngularFirestore} from "@angular/fire/firestore";
import {StorageService} from "../../../core/services/storage.service";

@Injectable({
  providedIn: 'root'
})
export class CourseFeatureStoreService {
  private COURSE_KEY = 'COURSE_KEY';

  private course$: BehaviorSubject<Course> = new BehaviorSubject<Course>(null);

  constructor(private firestore: AngularFirestore,
              private storageService: StorageService) {
    this.checkSavedCourseId();
  }

  get course(): Course {
    if (!this.course$.getValue()) {
      throw new Error('trying to access course in CourseFeatureStoreService, but does not exists');
    }

    return this.course$.getValue();
  }

  getCourse(): Observable<Course> {
    return this.course$.asObservable();
  }

  setCourse(courseId): void {
    if (this.course$.getValue() && this.course$.getValue().courseId === courseId) {
      return;
    }
    this.getCourseFromFirestore(courseId).pipe(first()).subscribe(res => {
      this.storageService.saveData(this.COURSE_KEY, res.courseId);
      this.course$.next(res)
    });
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
      this.firestore.collection('courses').doc(courseId).collection('private')
        .doc('private').valueChanges()
    ]).pipe(
      map(([coursePublic, coursePrivate]) => {
        return {coursePublic, coursePrivate} as CourseCreate
      }),
      map((res: CourseCreate) => {
        return {...res.coursePublic, ...res.coursePrivate} as Course
      })
    );
  }


}
