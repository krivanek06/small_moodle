import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import {CourseTestStateEnum} from "@app/core";

@Directive({
  selector: '[appTestState]'
})
export class TestStateDirective implements OnInit {
  @Input() testState: CourseTestStateEnum;

  constructor(private el: ElementRef) {
  }

  ngOnInit(): void {
    if (this.testState === CourseTestStateEnum.APPROVED) {
      this.el.nativeElement.style.color = '#2dd36f';
    } else if (this.testState === CourseTestStateEnum.IN_PROGRESS) {
      this.el.nativeElement.style.color = '#193a75';
    } else if (this.testState === CourseTestStateEnum.WAITING_FOR_APPROVAL) {
      this.el.nativeElement.style.color = '#ffc409';
    }
  }
}
