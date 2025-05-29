import { Component, inject, Input} from '@angular/core';
import { Reclamacao } from '../../models/class/reclamacao';
import { RouterLink } from '@angular/router';
import { SweetAlertService } from '../../Services/sweetAlert.service';

import { IUser } from '../../models/interface/IUser.model';

@Component({
    selector: 'app-reclamacao-card',
    imports: [RouterLink],
    templateUrl: './reclamacao-card.component.html',
    styleUrl: './reclamacao-card.component.css'
})
export class ReclamacaoCardComponent   {
  @Input () card !: Reclamacao;
  @Input () user ?: IUser;
  private sweetAlert = inject(SweetAlertService);

  // Função para excluir Reclamacao. Função assincrona: precisa usar async e await
  protected async exclusaoReclamacao(id:number){
    const confirm = await this.sweetAlert.confirmExclusion(`Deseja mesmo exluir a Reclamação: ${id}?`);
    console.log(confirm)
    if(confirm){
      this.sweetAlert.showMessage("Reclamação Excluída com sucesso");
    }
  }
}


