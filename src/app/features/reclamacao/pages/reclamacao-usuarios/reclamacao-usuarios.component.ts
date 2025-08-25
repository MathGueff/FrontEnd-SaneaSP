import { IUser } from '@features/usuario/models/usuario.model';
import { Component, inject, OnInit } from '@angular/core';
import { ReclamacaoCardComponent } from '@features/reclamacao/components/reclamacao-card/reclamacao-card.component';
import { NotFoundComponent } from '@shared/components/not-found/not-found.component';
import { Observable } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '@core/services/auth.service';
import { ReclamacaoService } from '@features/reclamacao/services/reclamacao.service';
import { IReclamacao } from '@features/reclamacao/models/reclamacao.model';
import { TagSelectComponent } from '@shared/components/tag-select/tag-select.component';
import { ICategoria } from '@features/categoria/models/categoria.model';

@Component({
    selector: 'app-reclamacao-usuarios',
    imports: [
        ReclamacaoCardComponent,
        NotFoundComponent,
        CommonModule,
        RouterLink,
        TagSelectComponent,
    ],
    templateUrl: './reclamacao-usuarios.component.html',
    styleUrl: './reclamacao-usuarios.component.css'
})
export class ReclamacaoUsuariosComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private reclamacaoService = inject(ReclamacaoService);
  private tags: ICategoria[] = []
  protected reclamacoes$!: Observable<IReclamacao[]>;
  protected user!: IUser;
  protected vazio: boolean = false;
  protected erro: string = 'Você não possuí Denúncias';



  ngOnInit(): void {
    this.user = this.thisIsUser();

    this.getUserReclamacoes();
  }

  protected getUserReclamacoes() {
    this.reclamacoes$ = this.reclamacaoService.getByUser();
    this.getReclamacao();
  }

  private thisIsUser(): IUser {
    let user = this.authService.getCurrentUser();
    if (!user) {
      this.router.navigate(['']);
    }
    return user as IUser;
  }

  protected ChangeTag($event:ICategoria[]){
    this.tags = $event;
  }
  protected PesquisarPorTag(){
    if(this.tags.length > 0){
      this.reclamacoes$ = this.reclamacaoService.getByTag(this.tags,this.user.id);
    }
    else{
      this.reclamacoes$ = this.reclamacaoService.getByUser();
    }
    this.getReclamacao();
  }
  private getReclamacao(){
    this.reclamacoes$.subscribe({
      next: (reclamacoes) => {
        console.log(reclamacoes);
        if (reclamacoes.length === 0) {
          this.vazio = true;
        }
      },
      error: (err) => {
        this.vazio = true;
        console.error(err);
      },
    });
  }
}
