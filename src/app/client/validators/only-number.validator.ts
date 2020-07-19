import {AbstractControl} from '@angular/forms';

export function OnlyNumberValidator(control: AbstractControl) {
  if (control.value) {
    const regexp = control.value.match(/^[0-9]\d*$/g);
    console.log(regexp);
    if (!regexp) {
      return {
        onlyNumber: true
      };
    } else {
      return null;
    }
  } else {
    return null;
  }
}
