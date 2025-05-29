import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ViacepService } from '../../Services/viacep.service';
import { Reclamacao } from '../../models/class/reclamacao';
import { UserService } from '../../Services/user.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { NotFoundComponent } from '../../Common/not-found/not-found.component';

@Component({
    selector: 'app-reclamacao-edicao',
    imports: [CommonModule, ReactiveFormsModule, NotFoundComponent],
    templateUrl: './reclamacao-edicao.component.html',
    styleUrl: './reclamacao-edicao.component.css'
})
export class ReclamacaoEdicaoComponent implements OnInit {
    private formBuider = inject(NonNullableFormBuilder);
    private router = inject(Router);
    private viacepService = inject(ViacepService);
    private userService = inject(UserService);
    private activeRouter = inject(ActivatedRoute);
    protected erro : string = "";
    protected vazio : boolean = false;
    protected path :string = "../";

    private reclamacao ?: Reclamacao
    reclamacoes: Reclamacao [] = [
      {
        idReclamacao: 1,
        tituloReclamao: "Falta de abastecimento de água",
        descricaoReclamacao: "Há três dias o bairro está sem água, afetando diversas famílias. A situação está insustentável, pois as pessoas não conseguem realizar atividades básicas como cozinhar, tomar banho ou lavar roupas. Entramos em contato com a companhia de saneamento, mas até agora não houve retorno sobre o motivo da interrupção ou previsão de normalização.",
        dataReclamacao: "2024-11-28",
        objTag: "Abastecimento",
        objImagem : "img/paginas/reclamacoes/user1.jpg",
        objUsuario :{
          id: 1,
          nome: 'Matheus',
          email: 'gueff@gmail.com',
          senha: 'math',
          endereco:{
            cep: '18075718',
            bairro : 'Jardim Brasilândia',
            logradouro : 'Rua Alonco Muchon',
            cidade : 'Sorocaba'
          }
        }
      },
      {
        idReclamacao: 2,
        tituloReclamao: "Vazamento de esgoto na rua",
        descricaoReclamacao: "Esgoto está vazando na rua há mais de uma semana e ninguém resolve. O odor é insuportável, e a situação está causando transtornos aos moradores e comerciantes da região. Além disso, o esgoto acumulado atrai insetos e representa um grave risco à saúde pública, especialmente para crianças que brincam no local.",
        dataReclamacao: "2024-11-27",
        objTag: "Esgoto",
        objImagem : "img/paginas/reclamacoes/user2.jpg",
        objUsuario:{
          id: 2,
          nome: 'Davy',
          email: 'davy@gmail.com',
          senha: 'davy',
          endereco:{
            cep: '17571802',
            bairro : 'Jardim Europa',
            logradouro : 'Rua Rock',
            cidade : 'Votorantim'
          }
        }
      },
      {
        idReclamacao: 3,
        tituloReclamao: "Falta de coleta de lixo",
        descricaoReclamacao: "A coleta de lixo não foi realizada no bairro nos últimos cinco dias, acumulando sacos de lixo nas ruas. Isso tem atraído animais como ratos e baratas, gerando um risco à saúde pública. Diversos moradores já entraram em contato com a prefeitura, mas ainda não há previsão para regularizar o serviço.",
        dataReclamacao: "2024-11-26",
        objTag: "Lixo",
        objImagem : "img/paginas/reclamacoes/user3.jpg",
        objUsuario:{
          id: 3,
          nome: 'Adryann',
          email: 'adryann@gmail.com',
          senha: 'adry',
          endereco:{
            cep: '11111111',
            bairro : 'Bairro tal',
            logradouro : 'Rua tal',
            cidade : 'Sorocaba'
          }
        }
      },
      {
        idReclamacao: 4,
        tituloReclamao: "Água contaminada",
        descricaoReclamacao: "A água fornecida pelo sistema público está com um odor forte e coloração amarelada. Diversos moradores já relataram problemas gastrointestinais após o consumo, mesmo depois de ferver a água. Não houve qualquer comunicado oficial sobre a causa do problema, e isso está gerando preocupação generalizada no bairro.",
        dataReclamacao: "2024-11-25",
        objTag: "Qualidade da Água",
        objImagem : "img/paginas/reclamacoes/user4.jpg",
        objUsuario:{
          id: 2,
          nome: 'Davy',
          email: 'davy@gmail.com',
          senha: 'davy',
          endereco:{
            cep: '17571802',
            bairro : 'Jardim Europa',
            logradouro : 'Rua Rock',
            cidade : 'Votorantim'
          }
        }
      },
      {
        idReclamacao: 5,
        tituloReclamao: "Erosão em área de drenagem",
        descricaoReclamacao: "A má manutenção do sistema de drenagem causou erosões no terreno, colocando em risco casas próximas. A água da chuva não está sendo drenada adequadamente, resultando em enchentes frequentes e agravando os danos. Os moradores estão preocupados com a possibilidade de deslizamentos.",
        dataReclamacao: "2024-11-24",
        objTag: "Drenagem",
        objImagem : "img/paginas/reclamacoes/user5.jpg",
        objUsuario: {
          id: 4,
          nome: 'Ryan',
          email: 'ryan@gmail.com',
          senha: 'ryan',
          endereco:{
            cep: '11111111',
            bairro : 'Bairro tal',
            logradouro : 'Rua tal',
            cidade : 'Sorocaba'
          }
        }
      },
    ];
    rows: number = 2;
    src: any = null;


    form = this.formBuider.group({
      titulo: [this.reclamacao?.tituloReclamao, [Validators.required]],
      descricao: [this.reclamacao?.descricaoReclamacao, [Validators.required]],
      cep: [
        this.reclamacao?.objEndereco?.cep,
        [Validators.required, Validators.minLength(8), Validators.maxLength(8)],
      ],
      numero: [this.reclamacao?.objEndereco?.numero, [Validators.required]],
      cidade: [this.reclamacao?.objEndereco?.cidade, [Validators.required]],
      bairro: [this.reclamacao?.objEndereco?.bairro, [Validators.required]],
      rua: [this.reclamacao?.objEndereco?.logradouro, [Validators.required]],
      complemento: [this.reclamacao?.objEndereco?.complemento],
      tag: [this.reclamacao?.objTag],
      imagem: [this.reclamacao?.objImagem],
    });

    onSubmit() {
      if (this.form.valid) {
        console.log(this.form.value);
        this.router.navigate(['reclamacao-inicial']);
      }
    }
    ngOnInit(): void {
      this.activeRouter.params.subscribe((params)=>{
        this.reclamacao = this.reclamacoes.find((objReclamacao)=>{
          return objReclamacao.idReclamacao ===  Number(params['id']);
        })
        if(!this.reclamacao){
          this.vazio = true;
          this.erro = "Reclamação Inexistente";
          return;
        }
        this.form.patchValue({
          titulo: this.reclamacao.tituloReclamao,
          descricao: this.reclamacao?.descricaoReclamacao,
          cep: this.reclamacao.objEndereco?.cep,
          cidade: this.reclamacao.objEndereco?.cidade,
          rua: this.reclamacao.objEndereco?.logradouro,
          bairro: this.reclamacao.objEndereco?.bairro,
          complemento: this.reclamacao.objEndereco?.complemento,
          tag: this.reclamacao.objTag,
          imagem: this.reclamacao.objImagem
        });
        console.log(this.reclamacao);
      })
      this.form.controls.cep.valueChanges.subscribe(() => {
        if (
          this.form.controls.cep.valid &&
          this.form.controls.cep?.value?.length == 8) {
          this.searchAddress(this.form.controls.cep.value);
        } else {
          console.log('CEP INVÁLIDO');
          this.resetAddressControls();
        }
      });
    }
    searchAddress(cep:string) {
      this.viacepService.getAddress(cep).subscribe({
        next: (response) => {
          if (response.logradouro) {
            this.setAddressControl('rua', response.logradouro);
          } else {
            console.log('A rua não foi encontrada para o CEP informado.');
          }

          if (response.bairro) {
            this.setAddressControl('bairro', response.bairro);
          } else {
            console.log('O logradouro não foi encontrado para o CEP informado.');
          }

          if (response.localidade) {
            this.setAddressControl('cidade', response.localidade);
          } else {
            console.log('A cidade não foi encontrada para o CEP informado.');
          }
        },
        error: (e) => {
          console.log(e);
        },
      });
    }

    resetAddressControls() {
      let addressControls = ['rua', 'bairro', 'cidade'];
      addressControls.forEach((field) => {
        this.form.get(field)!.reset();
      });
    }

    private setAddressControl(control: string, value: string) {
      this.form.get(control)?.setValue(value);
    }
    protected autoResize():void {
      let objTextArea = document.querySelector('textarea');
      if (objTextArea?.value) {
        if (objTextArea.scrollHeight >= objTextArea.offsetHeight) {
          this.rows += 1;
          console.log("Scroll Height: "+ objTextArea.scrollHeight);
          console.log("offsetHeight: "+ objTextArea.offsetHeight);
        }
      } else {
        this.rows = 2;
      }
    }
    protected setPreview(event: any){
      const file:File = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.src = e.target.result;

        };
        reader.readAsDataURL(file);
      }
    }
}
