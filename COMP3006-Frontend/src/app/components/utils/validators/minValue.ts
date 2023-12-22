import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export function minValue(value?: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

        if (!value) {
            return null;
        }

        const formGroup = control as FormGroup;
        const setValues  = Object.values(formGroup.value).filter((item)=> item === true);
        if (setValues.length < value) {
            control.setErrors({'TooFew': true});
        } else {
            control.setErrors({'TooFew': false})
        }

        return null;
    }

}