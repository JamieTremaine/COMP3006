import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export function required(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

        const formGroup = control as FormGroup;
        const setValues  = Object.values(formGroup.value).filter((item)=> item === true);
        if (setValues.length === 0) {
            control.setErrors({'atLeastOne': true});
        } else {
            control.setErrors({'atLeastOne': false})
        }

        return null;
    }

}