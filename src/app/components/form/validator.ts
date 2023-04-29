import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static differentOriginAndDestination(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const origin = control.get('origin') as FormControl;
      const destination = control.get('destination') as FormControl;
      return origin.value === destination.value ? { 'sameValue': true } : null;
    };
  }
}
