import { ReclamacaoService } from './../../Services/reclamacao.service';
import { Reclamacao } from '../../models/class/reclamacao';
import { Component, inject, OnInit } from '@angular/core';
import { ReclamacaoCardComponent } from '../reclamacao-card/reclamacao-card.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, Observable, toArray } from 'rxjs';
import { NotFoundComponent } from '../../Common/not-found/not-found.component';
import { AuthService } from '../../Services/auth.service';
import { IReclamacao } from '../../models/interface/IReclamacao.interface';



@Component({
  selector: 'app-reclamacao-inicial',
  standalone: true,
  imports: [CommonModule, ReclamacaoCardComponent, RouterLink, ReactiveFormsModule,NotFoundComponent],
  templateUrl: './reclamacao-inicial.component.html',
  styleUrl: '../reclamacao-usuarios/reclamacao-usuarios.component.css'
})
export class ReclamacaoInicialComponent implements OnInit {
  protected authService = inject(AuthService);
  protected reclamacaoService = inject(ReclamacaoService);
  usuarioAtivo$ = this.authService.getObservableCurrentUser(); // Observable com as informações do admin
  reclamacoes$ !: Observable<IReclamacao[]>;
  private reclamacaoSubject =new BehaviorSubject<Reclamacao[]>([] as any);
  data$:Observable<Reclamacao[]> = this.reclamacaoSubject.asObservable();
  protected vazio !: boolean
  erroMensage !: string;
  erroType : string = "carregando";

  TagSelect: FormGroup;

  constructor(private fb:FormBuilder){
    this.reclamacoes$ = this.reclamacaoService.getObservableReclamacao();
    this.TagSelect = this.fb.group({
        tagForm: ['Todos']
      }
    );
  }

  ngOnInit():void{

    this.reclamacoes$.subscribe({
      next:(reclamacoes)=>{
      if(reclamacoes.length !== 0){
        this.vazio = false;
      }
      else{
        this.vazio = true;
        this.erroMensage = "Reclamações";
        this.erroType = "Não foi possível encontrar Reclamação"
      }
    },
      error:()=>{
        this.vazio = true;
        this.erroMensage = "Não foi possível encontrar Reclamação";
        this.erroType = "error"
      }

    });

  }
  protected PesquisarPorTag(){
      if(this.TagSelect.value.tagForm === "Todos" || this.TagSelect.value.tagForm == ""){
        this.reclamacoes$ = this.reclamacaoService.getObservableReclamacao();
      }
      // Filtra o array de Reclamações pela tag selecionada
      else{
        this.reclamacoes$ = this.reclamacaoService.getObservableReclamacao()
      }
  }

}
