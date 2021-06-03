import { Injectable } from '@angular/core';
import Swal,{ SweetAlertResult } from 'sweetalert2';

@Injectable({providedIn: 'root'})
export class PopupDialogsService {

    topEndError(title:string, timer:number=2000):Promise<SweetAlertResult<any>> {
        return Swal.fire({
            position: 'top-end',
            icon: 'error',
            title,
            showConfirmButton: false,
            timer
          });
    }

    topEndSuccess(title:string, timer:number=2000):Promise<SweetAlertResult<any>> {
        return Swal.fire({
            position: 'top-end',
            icon: 'success',
            title,
            showConfirmButton: false,
            timer
          });
    }

    topEndWarn(title:string, timer:number=2000):Promise<SweetAlertResult<any>> {
        return Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title,
            showConfirmButton: false,
            timer
          });
    }
}