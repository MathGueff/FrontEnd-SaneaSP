import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult, SweetAlertOptions } from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class SweetAlertService {
  /**
   *
   * @param message mensagem a ser mostrada no alert
   * @param error true - ícone de sucesso | false - ícone de erro
   * @returns Promise com o alert (para manipular estados do sweetAlert aberto)
   */
  public showMessage(
    message: string,
    error?: boolean,
  ): Promise<SweetAlertResult> {
    const swalConfig: SweetAlertOptions = {
      title: message,
      icon: error ? 'error' : 'success',
      confirmButtonText: 'Ok',
      background: '#295A80',
      color: '#e8e3e3',
      customClass: {
        confirmButton: 'sweet_btn_success',
        title: 'sweet_title',
      },
    };
    return Swal.fire(swalConfig);
  }
  //Função assincrona. Ela retorna uma Promessa, isso quer dizer deve ser usada junto com asyc e await
  public async confirmExclusion(message:string):Promise<boolean>{
      const  result = await Swal.fire({
      title: message,
      showConfirmButton: true,
      showDenyButton: true,
      icon:'question',
      background: '#295A80',
      color: '#e8e3e3',
      confirmButtonText: 'Excluir',
      denyButtonText: `Cancelar`,
      reverseButtons: true,
      customClass: {
        confirmButton: 'sweet_btn_success',
        title : 'sweet_title',
      },
    });
    return result.isConfirmed;
  }
    public async confirmUpdate(message:string):Promise<boolean>{
      const  result = await Swal.fire({
      title: message,
      showConfirmButton: true,
      showDenyButton: true,
      icon:'question',
      background: '#295A80',
      color: '#e8e3e3',
      confirmButtonText: 'Salvar',
      denyButtonText: `Cancelar`,
      reverseButtons: true,
      customClass: {
        confirmButton: 'sweet_btn_success',
        title : 'sweet_title',
      },
    });
    return result.isConfirmed;
  }
}
