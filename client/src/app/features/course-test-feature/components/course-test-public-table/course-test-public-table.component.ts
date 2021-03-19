import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CourseTestPublic} from "../../model/course-test-firebase.model";

@Component({
    selector: 'app-course-test-public-table',
    templateUrl: './course-test-public-table.component.html',
    styleUrls: ['./course-test-public-table.component.scss'],
})
export class CourseTestPublicTableComponent implements OnInit {
    @Output() clickedEmitter: EventEmitter<CourseTestPublic> = new EventEmitter<CourseTestPublic>();

    @Input() courseTests: CourseTestPublic[] = [];

    constructor() {
    }

    ngOnInit() {
    }

    clickedTest(courseTest: CourseTestPublic) {
        this.clickedEmitter.emit(courseTest);
    }

}
