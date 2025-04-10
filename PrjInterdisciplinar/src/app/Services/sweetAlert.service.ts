import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class SweetAlertService {
  public showMessage(message: string, error ?: boolean) {
    Swal.fire({
      title: message,
      icon:  error ? 'error' : 'success',
      confirmButtonText: 'Ok',
      background: '#295A80',
      color: '#e8e3e3',
      customClass: {
        confirmButton: 'sweet_btn_success',
        title : 'sweet_title',
      },
    });
  }
}
