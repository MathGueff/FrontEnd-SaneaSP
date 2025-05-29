import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Noticia } from '../../models/class/noticia';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { NoticiasCardComponent } from "../noticias-card/noticias-card.component";
import { NoticiaService } from '../../Services/noticia.service';
import { INoticia } from '../../models/interface/INoticias.model';
import { NotFoundComponent } from '../../Common/not-found/not-found.component';

@Component({
    selector: 'app-noticias-inicial',
    imports: [CommonModule, NoticiasCardComponent, ReactiveFormsModule, NotFoundComponent],
    templateUrl: './noticias-inicial.component.html',
    styleUrl: './noticias-inicial.component.css'
})
export class NoticiasInicialComponent implements OnInit{
  private noticiaService = inject(NoticiaService);
  private NoticiaSubject =new BehaviorSubject<INoticia[]>([] as any);

  //variaveis para poder controlar o componente NotFound
  protected vazio: boolean = false;
  erro: string = "notícia"

  data$:Observable<INoticia[]> = this.NoticiaSubject.asObservable();
  TagSelect: FormGroup;
  noticias: INoticia[] = this.noticiaService.getNoticias();

  constructor(private fb:FormBuilder){
    this.NoticiaSubject.next(this.noticias);
    this.TagSelect = this.fb.group({
        tagForm: ['Todos']
      }
    );
   }

   ngOnInit():void{
    this.TagSelect.valueChanges.subscribe(() => {
      let lista : INoticia [] = [];
      //Verifica se nenhuma Tag foi selecionada
      if(this.TagSelect.value.tagForm === "Todos" || this.TagSelect.value.tagForm == ""){
        lista = this.noticias;
      }
      // Filtra o array de Reclamações pela tag selecionada
      else{
        lista = this.noticias.filter((Noticia) =>{
        return Noticia.tags_noticia[0] === this.TagSelect.value.tagForm
      });
      }
      //atualizando o valor do Observabale
      if(lista.length > 0){
        this.vazio = false;
      }
      else{
        this.vazio = true;
      }
      this.NoticiaSubject.next(lista);
    })
  }
}
