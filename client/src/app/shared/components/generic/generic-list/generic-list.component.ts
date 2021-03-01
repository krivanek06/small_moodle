import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-generic-list',
    templateUrl: './generic-list.component.html',
    styleUrls: ['./generic-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenericListComponent implements OnInit {
    @Input() title: string;
    @Input() additionalInfo: string;
    @Input() iconTitle: string;
    @Input() applyMarginTop = false;

    constructor() {
    }

    ngOnInit() {
    }

}
