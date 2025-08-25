import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { IReclamacao } from '@features/reclamacao/models/reclamacao.model';
import { ReclamacaoService } from '@features/reclamacao/services/reclamacao.service';
import { StatusReclamacao } from '@features/reclamacao/models/reclamacao.model';
import { NotFoundComponent } from '@shared/components/not-found/not-found.component';

@Component({
    selector: 'app-reclamacao-descricao',
    imports: [CommonModule, RouterLink, NotFoundComponent],
    templateUrl: './reclamacao-descricao.component.html',
    styleUrl: './reclamacao-descricao.component.css',
    standalone:true
})
export class ReclamacaoDescricaoComponent implements OnInit {
  //Observable de reclamacao
  private reclamacaoService = inject(ReclamacaoService);
  reclamacao$ !: Observable<IReclamacao | undefined>

  //variaveis para poder controlar o componente NotFound
  protected existReclamcao: boolean = true;
  erro: string = "";
  protected situation:string = "";
  caminhoVoltar : string = "@"; //caminho para voltar para reclamação inicial
  constructor(private activedrouter : ActivatedRoute){}
  ngOnInit(): void {
    this.activedrouter.params.subscribe( (parametros) =>{
      // pega o valor do parametro da URL
      const idParametro = Number(parametros['id']);
      // procura a reclamação que tenha o ID da URL
      this.reclamacao$ = this.reclamacaoService.getByIdReclamacao(idParametro);
      this.reclamacao$.subscribe({
        next:(reclamacao)=> {
          if(reclamacao){
            this.situationDenuncia(reclamacao.status)
          }
          else{
            this.existReclamcao = false;
            this.erro = "Denúncia Inexistente"}
        },
      })
    }
    )
  }
  protected situationDenuncia(situacao: StatusReclamacao){
    switch (situacao) {
      case 0:
        this.situation = 'Aberto';
        break;
      case 1:
        this.situation = 'Visualizada';
        break;
      case 2:
        this.situation = 'Análise';
        break;
      default:
        this.situation = 'Resolvida';
        break;
    }
  }
}
