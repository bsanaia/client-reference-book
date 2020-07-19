import {AbstractControl} from '@angular/forms';

export function ValidateLanguageChars(control: AbstractControl) {
  if (control.value) {
    const georgianRegexp = control.value.match(/[\u10D0-\u10F0]/g) || [];
    const upperCaseEnglishRegexp = control.value.match(/[\u0041-\u005A]/g) || [];
    const lowerCaseEnglishRegexp = control.value.match(/[\u0061-\u007A]/g) || [];
    if (georgianRegexp.length === 0 && upperCaseEnglishRegexp.length === 0 && lowerCaseEnglishRegexp.length === 0) {
      return {wrongCharacters: true};
    }
    if (georgianRegexp.length > 0 && (upperCaseEnglishRegexp.length > 0 || lowerCaseEnglishRegexp.length > 0)) {
      return { twoLanguageNotAllowed: true };
    }
  } else {
    return null;
  }
}
