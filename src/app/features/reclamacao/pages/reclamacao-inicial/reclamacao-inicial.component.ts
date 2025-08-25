import { ReclamacaoService } from '@features/reclamacao/services/reclamacao.service';
import { Reclamacao } from '@features/reclamacao/models/reclamacao.model';
import { Component, inject, OnInit } from '@angular/core';
import { ReclamacaoCardComponent } from '../../components/reclamacao-card/reclamacao-card.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { NotFoundComponent } from '@shared/components/not-found/not-found.component';
import { AuthService } from '@core/services/auth.service';
import { IReclamacao } from '@features/reclamacao/models/reclamacao.model';
import { TagSelectComponent } from '@shared/components/tag-select/tag-select.component';
import { ICategoria } from '@features/categoria/models/categoria.model';

@Component({
    selector: 'app-reclamacao-inicial',
    imports: [
        CommonModule,
        ReclamacaoCardComponent,
        RouterLink,
        NotFoundComponent,
        TagSelectComponent,
    ],
    templateUrl: './reclamacao-inicial.component.html',
    styleUrl: '../reclamacao-usuarios/reclamacao-usuarios.component.css'
})
export class ReclamacaoInicialComponent implements OnInit {
  protected authService = inject(AuthService);
  protected reclamacaoService = inject(ReclamacaoService);
  usuarioAtivo$ = this.authService.currentUser$; // Observable com as informações do admin
  reclamacoes$ !: Observable<IReclamacao[]>
  private reclamacaoSubject = new BehaviorSubject<Reclamacao[]>([] as any);
  data$:Observable<Reclamacao[]> = this.reclamacaoSubject.asObservable();
  protected vazio: boolean = false;
  private tags: ICategoria[] = [];
  erro: string = 'Não foi possível encontrar nenhuma Denúncia';

  ngOnInit(): void {
    this.reclamacoes$ = this.reclamacaoService.getObservableReclamacao();
    this.getReclamacao()
  }
  protected ChangeTagsSelect($event: ICategoria[]) {
    this.tags = $event;
  }
  protected PesquisarPorTag() {
    if (this.tags.length === 0) {
      this.reclamacoes$ = this.reclamacaoService.getObservableReclamacao();
    } else {
      this.reclamacoes$ = this.reclamacaoService.getByTag(this.tags);
    }
    this.getReclamacao()
  }
  private getReclamacao(){
    this.reclamacoes$.subscribe({
      next: (reclamacoes) => {
        console.log(reclamacoes);
        if (reclamacoes.length === 0) {
          this.vazio = true;
        }
        else{
          this.vazio = false;
        }
      },
      error: (err) => {
        this.vazio = true;
        console.error(err);
      },
    });
  }
}
