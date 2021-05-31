import { Injectable } from '@angular/core';
import Swal,{ SweetAlertResult } from 'sweetalert2';

@Injectable({providedIn: 'root'})
export class PopupDialogsService {

    topEndError(title:string):Promise<SweetAlertResult<any>> {
        return Swal.fire({
            position: 'top-end',
            icon: 'error',
            title,
            showConfirmButton: false,
            timer: 1500
          });
    }
}