import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({providedIn: 'root'})
export class FormUtilService {
    cleanForm(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach((key) => {            
            if(typeof formGroup.get(key)?.value == 'string')
                formGroup.get(key)?.setValue(formGroup.get(key)?.value.trim());            
        });
    }
}