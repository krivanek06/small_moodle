import {IonicDialogService} from "../services/ionic-dialog.service";


export function Confirmable(message: string, cancelButton = 'Cancel') {
  return function (target: any, key: string | symbol, descriptor: PropertyDescriptor) {
    const original = descriptor.value;
    descriptor.value = function (...args: any[]) {
      IonicDialogService.presentAlertConfirm(message, cancelButton).then(result => result ? original.apply(this, args) : null);
    };
  };
}
