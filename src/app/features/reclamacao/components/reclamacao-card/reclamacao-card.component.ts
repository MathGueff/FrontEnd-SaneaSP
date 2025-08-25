import { Component, EventEmitter, inject, Input, Output} from '@angular/core';
import { RouterLink } from '@angular/router';
import { SweetAlertService } from '@shared/services/sweet-alert.service';

import { IUser } from '@features/usuario/models/usuario.model';
import { IReclamacao } from '@features/reclamacao/models/reclamacao.model';
import { ReclamacaoService } from '@features/reclamacao/services/reclamacao.service';

@Component({
    selector: 'app-reclamacao-card',
    imports: [RouterLink],
    templateUrl: './reclamacao-card.component.html',
    styleUrl: './reclamacao-card.component.css',
    standalone:true
})
export class ReclamacaoCardComponent   {
  @Input () card !: IReclamacao;
  @Input () user ?: IUser;
  @Output() onDelete = new EventEmitter<number>();
  private sweetAlert = inject(SweetAlertService);
  private reclamacaoService = inject(ReclamacaoService);

  // Função para excluir Reclamacao. Função assincrona: precisa usar async e await
  protected async exclusaoReclamacao(id:number){
    const confirm = await this.sweetAlert.confirmExclusion(`Deseja mesmo exluir essa Dénuncia: ${this.card.titulo}?`);
    if(confirm){
      this.reclamacaoService.deleteReclamacao(id).subscribe({
        next: async()=>{
          await this.sweetAlert.showMessage("Denúncia excluída com sucesso");
          this.onDelete.emit(id)
        },
        error:()=>{
          this.sweetAlert.showMessage("Não foi possível excluir Denúncia");
        }
      })
    }
  }
}


