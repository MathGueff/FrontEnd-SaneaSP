import { Component, inject, Input} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SweetAlertService } from '../../Services/sweetAlert.service';
import { CommonModule } from '@angular/common';
import { IUser } from '../../models/interface/IUser.model';
import { IReclamacao } from '../../models/interface/IReclamacao.interface';
import { ReclamacaoService } from '../../Services/reclamacao.service';

@Component({
  selector: 'app-reclamacao-card',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './reclamacao-card.component.html',
  styleUrl: './reclamacao-card.component.css'
})
export class ReclamacaoCardComponent   {
  @Input () card !: IReclamacao;
  @Input () user ?: IUser;
  private sweetAlert = inject(SweetAlertService);
  private reclamacaoService = inject(ReclamacaoService);
  private router = inject(Router)
  // Função para excluir Reclamacao. Função assincrona: precisa usar async e await
  protected async exclusaoReclamacao(id:number){
    const confirm = await this.sweetAlert.confirmExclusion(`Deseja mesmo exluir a Reclamação: ${id}?`);
    if(confirm){
      this.reclamacaoService.deleteReclamacao(id).subscribe({
        next: async()=>{
          await this.sweetAlert.showMessage("Reclamação excluída com sucesso");
          window.location.reload()
        },
        error:(err)=>{
          this.sweetAlert.showMessage("Não foi possível excluir Reclamação");
        }
      })
    }
  }
}


