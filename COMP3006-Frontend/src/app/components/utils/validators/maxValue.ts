import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export function maxValue(value?: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

        if (!value) {
            return null;
        }

        const formGroup = control as FormGroup;
        const setValues  = Object.values(formGroup.value).filter((item)=> item === true);
        if (setValues.length > value) {
            control.setErrors({'TooMany': true});
        } else {
            control.setErrors({'TooMany': false})
        }

        return null;
    }

}