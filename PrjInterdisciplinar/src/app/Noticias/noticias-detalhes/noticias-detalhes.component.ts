import { Component, inject } from '@angular/core';
import { DetalheNoticia } from '../../models/class/detalhe';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { INoticia } from '../../models/interface/INoticias.model';
import { NoticiaService } from '../../Services/noticia.service';
import { NotFoundComponent } from "../../Common/not-found/not-found.component";

@Component({
    selector: 'app-noticias-detalhes',
    imports: [CommonModule, RouterLink, NotFoundComponent],
    templateUrl: './noticias-detalhes.component.html',
    styleUrl: './noticias-detalhes.component.css'
})
export class NoticiasDetalhesComponent {
  private noticiaService = inject(NoticiaService)
  Detalhes: INoticia[] = this.noticiaService.getNoticias();
  private DetalheSubject = new BehaviorSubject<INoticia | undefined>(undefined);
  dado$: Observable<INoticia | undefined> = this.DetalheSubject.asObservable();
  constructor(private activedrouter : ActivatedRoute){}

  //variaveis para poder controlar o componente NotFound
  protected vazio: boolean = false;
  erro: string = "";
  caminhoVoltar : string = "/noticia-inicial"; //caminho para voltar para noticia inicial
  ngOnInit(): void {

  this.activedrouter.params.subscribe( (parametros) =>{
    const idParametro = Number(parametros['id']);

    const detalhes = this.Detalhes.find((Detalhes) => Detalhes.id  === idParametro );

    if(detalhes !== undefined){
      this.vazio = false;
      this.DetalheSubject.next(detalhes);;
    }else{
      this.vazio = true;
      this.erro = "notícia";
    }
  }
  )
}
}
