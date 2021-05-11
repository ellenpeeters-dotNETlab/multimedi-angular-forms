import { AbstractControl, ValidatorFn } from '@angular/forms';

export function numberLength(min: number, max: number): ValidatorFn { 
    return (formControl: AbstractControl): { [key: string]: boolean} | null => { 
        const length = formControl.value.length;
        
        if (length < min || length > max) { 
            return {'LengthOfNumberNotCorrect': true};
        } 
        
        return null;
    } 
}