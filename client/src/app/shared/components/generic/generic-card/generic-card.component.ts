import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-generic-card',
    templateUrl: './generic-card.component.html',
    styleUrls: ['./generic-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenericCardComponent implements OnInit {
    @Input() subtitle: string;
    @Input() additionalClasses: string;
    @Input() applyLeftPadding = true;
    @Input() removeHeader = false;
    @Input() showNoData = false;

    constructor() {
    }

    ngOnInit() {
    }

}
