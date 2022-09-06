import { AbstractControl, FormGroup } from '@angular/forms';

export class ValidatorField {
  static MustMatch(controlName: string, matchingControlName: string): any {
    return (group: AbstractControl) => {
      const FormGroup = group as FormGroup;
      const control = FormGroup.controls[controlName];
      const matchingControl = FormGroup.controls[matchingControlName];

      if(matchingControl.errors && !matchingControl.errors['MustMatch']) {
        return null;
      }

      if(control.value != matchingControl.value){
        matchingControl.setErrors({MustMatch: true});
      }else {
        matchingControl.setErrors(null);
      }
      return null;
    };
  }
}
