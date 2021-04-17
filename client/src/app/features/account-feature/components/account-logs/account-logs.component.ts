import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LogModel} from "@core/models/Log.model";
import {Confirmable} from "@app/core";

@Component({
  selector: 'app-account-logs',
  templateUrl: './account-logs.component.html',
  styleUrls: ['./account-logs.component.scss'],
})
export class AccountLogsComponent implements OnInit {
  @Output() removeLogsEmitter: EventEmitter<any> = new EventEmitter<any>();

  @Input() logs: LogModel[] = [];

  constructor() {
  }

  ngOnInit() {
  }

  @Confirmable('Please confirm removing all your previous logs')
  removeLogs() {
    this.removeLogsEmitter.emit();
  }
}
