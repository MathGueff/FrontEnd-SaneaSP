import { Component, inject, OnInit } from '@angular/core';
import { ComentarioBaixoComponent } from '../comentario-baixo/comentario-baixo.component';
import { ComentarioCimaComponent } from '../comentario-cima/comentario-cima.component';
import { CommonModule } from '@angular/common';
import { ComentarioInputComponent } from '../comentario-input/comentario-input.component';
import { Comentario } from '../../models/comentario.model';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from '@features/usuario/services/user.service';
import { NotFoundComponent } from '@shared/components/not-found/not-found.component';
import { IReclamacao } from '@features/reclamacao/models/reclamacao.model';
import { ReclamacaoService } from '@features/reclamacao/services/reclamacao.service';

@Component({
    selector: 'app-comentario-central',
    imports: [
        CommonModule,
        ComentarioCimaComponent,
        ComentarioBaixoComponent,
        ComentarioInputComponent,
        RouterModule,
        NotFoundComponent
    ],
    templateUrl: './comentario-central.component.html',
    styleUrl: './comentario-central.component.css'
})
export class ComentarioCentralComponent implements OnInit {
  private userService = inject(UserService);
  private reclamacaoService = inject(ReclamacaoService);
  private usuarios = this.userService.getAllUsers();
  public reclamacao$ !: Observable<IReclamacao>
  //variaveis para poder controlar o componente NotFound
  protected vazio: boolean = true;
  erro: string = "" // mensaagem de erro
  caminhoVoltar: string = "@"; //caminho para voltar para reclamação descricao


  //Observable Comentário
  private comentarioSubject: BehaviorSubject<Comentario[]> =
    new BehaviorSubject([] as any);
  comentario$: Observable<Comentario[]> = this.comentarioSubject.asObservable();




  //Array para os objetos de Comentario
  // comentarios: Comentario[] = [
  //   {
  //   id: 1,
  //   descricaoComentario: "Estamos há três dias sem água no bairro, precisamos de uma solução urgente.",
  //   dataComentario: "2024-11-28T10:00:00",
  //   objAdmin: null,
  //   objReclamacao: this.reclamacoes[0],
  //   objUsuario: this.usuarios[0]
  // },
  // {
  //   id: 2,
  //   descricaoComentario: "Olá, João. Estamos cientes do problema e nossa equipe está trabalhando para resolver. A previsão é que o abastecimento normalize até o final do dia.",
  //   dataComentario: "2024-11-28T11:00:00",
  //   objAdmin: "Carlos Almeida",
  //   objReclamacao: this.reclamacoes[0],
  //   objUsuario: this.usuarios[0]
  // },
  // {
  //   id: 3,
  //   descricaoComentario: "Obrigado pela resposta, espero que normalizem mesmo, pois está difícil sem água.",
  //   dataComentario: "2024-11-28T12:00:00",
  //   objAdmin: null,
  //   objReclamacao: this.reclamacoes[0],
  //   objUsuario: this.usuarios[0]
  // },
  // {
  //   id: 4,
  //   descricaoComentario: "Tem um vazamento de esgoto na minha rua há dias e ninguém resolve. O cheiro está insuportável.",
  //   dataComentario: "2024-11-27T09:00:00",
  //   objAdmin: null,
  //   objReclamacao: this.reclamacoes[1],
  //   objUsuario: this.usuarios[1]
  // },
  // {
  //   id: 5,
  //   descricaoComentario: "Maria, agradecemos pelo aviso. Já acionamos a equipe de manutenção para verificar o vazamento. Vamos manter você informada.",
  //   dataComentario: "2024-11-27T10:00:00",
  //   objAdmin: "Carlos Almeida",
  //   objReclamacao: this.reclamacoes[1],
  //   objUsuario: this.usuarios[1]
  // },
  // {
  //   id: 6,
  //   descricaoComentario: "Espero que resolvam logo, pois está muito ruim aqui.",
  //   dataComentario: "2024-11-27T11:00:00",
  //   objAdmin: null,
  //   objReclamacao: this.reclamacoes[1],
  //   objUsuario: this.usuarios[1]
  // },
  // {
  //   id: 7,
  //   descricaoComentario: "A água está com cheiro forte e cor amarela. O que está acontecendo?",
  //   dataComentario: "2024-11-25T08:00:00",
  //   objAdmin: null,
  //   objReclamacao: this.reclamacoes[3],
  //   objUsuario: this.usuarios[3]
  // },
  // {
  //   id: 8,
  //   descricaoComentario: "Ana Paula, pedimos desculpas pelo transtorno. Houve um problema na estação de tratamento e já estamos corrigindo. Não consuma a água por enquanto.",
  //   dataComentario: "2024-11-25T09:00:00",
  //   objAdmin: "Carlos Almeida",
  //   objReclamacao: this.reclamacoes[3],
  //   objUsuario: this.usuarios[3]
  // },
  // {
  //   id: 9,
  //   descricaoComentario: "Obrigada pela explicação. Vou aguardar mais informações.",
  //   dataComentario: "2024-11-25T10:00:00",
  //   objAdmin: null,
  //   objReclamacao: this.reclamacoes[3],
  //   objUsuario: this.usuarios[3]
  // }
  // ];

  //Objeto Reclamação para colocar no título, data e descrição
  constructor(private activeroute: ActivatedRoute) { }
  ngOnInit(): void {
    this.activeroute.params.subscribe((params) => {
      // pega o valor do parametro da URL da Reclamação
      const IdParametro = Number(params['idReclamamacao']);
      this.reclamacao$ = this.reclamacaoService.getByIdReclamacao(IdParametro)
    });
    this.reclamacao$.subscribe({
      next:(reclamacao)=> {
        if(reclamacao){
          this.erro = "Não existe comentário para esta Denúncia"
          this.vazio = true;
        }
      },
      error:()=>{
        this.erro = "Denúncia não existe"
        this.vazio = true;
      }
    })
  }
}
