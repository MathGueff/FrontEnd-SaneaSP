import { DoencaErrorStatus } from '../../models/enums/DoencaErrorStatus.enum';

import { Component, inject, Input } from '@angular/core';
import { FormControl, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IDoenca } from '../../models/interface/IDoencas.model';
import { DoencaService } from '../../Services/doenca.service';
import { Router, RouterModule } from '@angular/router';
import { IFieldForm } from '../../models/interface/IFieldForm.model';
import { FormFieldComponent } from "../../Common/form-field/form-field.component";
import { CheckErrorComponent } from "../../Common/check-error/check-error.component";
import { SweetAlertService } from '../../Services/sweetAlert.service';
import { FormValidatorEnum } from '../../models/enums/FormValidatorEnum.enum';

@Component({
    selector: 'app-form-doenca',
    imports: [ReactiveFormsModule, RouterModule, FormFieldComponent, CheckErrorComponent],
    templateUrl: './form-doenca.component.html',
    styleUrl: './form-doenca.component.css'
})
export class FormDoencaComponent {
  //#region Dependencias
  private fb = inject(NonNullableFormBuilder);
  private doencaService = inject(DoencaService);
  private router = inject(Router);
  private sweetAlert = inject(SweetAlertService);
  //#endregion

  //#region Variáveis
  protected doencaErrorStatus: DoencaErrorStatus = DoencaErrorStatus.None; //Var de erros
  protected sintomas: string[] = []; //Sintomas adicionados
  protected fontes: string[] = []; //Fontes adicionadas
  protected imagens: string[] = []; //Imagens adicionadas

  src: any = null; // src atual para preview
  //#endregion

  //#region Formulário
  protected formDoenca = this.fb.group({
    nome_doenca: ['', [Validators.required]],
    descricao: ['', [Validators.required, Validators.minLength(15)]],
    transmissao: ['', [Validators.required]],
    tratamento: ['', [Validators.required]],
    sintoma_input: [''],
    sintoma_select: [''],
    imagem: [''],
    fonte: [''],
  })

  //Configuração dos inputs do formulário

  inputs: IFieldForm[] = [
    {
      controlName: 'nome_doenca',
      icon: 'assets/icones/black/doenca_icon.svg',
      label: 'Nome da Doença:',
      placeholder: 'Digite o nome da Doença',
      required: true,
      validators: [FormValidatorEnum.Required, FormValidatorEnum.MinLength]
    },
    {
      controlName: 'descricao',
      icon: 'img/paginas/reclamacoes/description-icon.svg',
      label: 'Descrição da Doença:',
      placeholder: 'Breve descrição da doença',
      required: true,
      validators: [FormValidatorEnum.Required, FormValidatorEnum.MinLength],
      typeField: 'textarea',
    },
    {
      controlName: 'tratamento',
      icon: 'assets/icones/black/doenca_icon.svg',
      label: 'Tratamento:',
      placeholder: 'Explique como a doença é tratada',
      required: true,
      validators: [FormValidatorEnum.Required],
      typeField: 'textarea'
    },
    {
      controlName: 'transmissao',
      icon: 'assets/icones/black/doenca_icon.svg',
      label: 'Transmissão:',
      placeholder: 'Explique como a doença é transmitida',
      required: true,
      validators: [FormValidatorEnum.Required],
      typeField: 'textarea'
    },
  ];

  //#endregion

  ngOnInit() {
    this.resetErrorStatus();
  }



  onEnter(event: Event, type: string): void {
    // 
    event.preventDefault();

    // Adiciona dependendo do tipo de campo
    if (type === 'fonte') {
      this.addFonte();
    } else if (type === 'sintoma-input') {
      this.addSintoma(this.formDoenca.controls.sintoma_input);
    } else if (type === 'sintoma-select')
      this.addSintoma(this.formDoenca.controls.sintoma_select)
  }

  //#region Sintomas
  addSintoma(sintomaControl: FormControl) {
    if (sintomaControl.valid && this.validateSintoma(sintomaControl.value)) {
      let sintoma_novo = sintomaControl.value;
      sintoma_novo = sintoma_novo.trim();
      if (!this.sintomas.some((sintoma) => sintoma == sintoma_novo)) {
        this.formDoenca.controls.sintoma_input.reset()
        this.formDoenca.controls.sintoma_select.reset()
        this.sintomas.push(sintoma_novo);
      }
      else {
        this.doencaErrorStatus = DoencaErrorStatus.invalidSintoma;
      }
    }
    else {
      this.doencaErrorStatus = DoencaErrorStatus.nullSintoma;
    }
  }

  validateSintoma(sintoma: string) {
    sintoma = sintoma.trim().toUpperCase();
    return (sintoma != "NENHUM" && sintoma != "" && sintoma != null);
  }

  removeSintoma(sintoma_excluido: string) {
    const i = this.sintomas.indexOf(sintoma_excluido);

    if (i !== -1) {
      this.sintomas.splice(i, 1);
    }
  }
  //#endregion 

  //#region Fontes
  addFonte() {
    const fonte = this.formDoenca.controls.fonte;
    if (fonte.valid && fonte.value != "") {
      let fonte_novo = fonte.value;
      fonte_novo = fonte_novo.trim();
      if (!this.fontes.some((fonte) => fonte == fonte_novo)) {
        fonte.reset();
        this.fontes.push(fonte_novo);
      }
      else {
        this.doencaErrorStatus = DoencaErrorStatus.invalidFonte;
      }
    }
    else {
      this.doencaErrorStatus = DoencaErrorStatus.nullFonte;
    }
  }

  removeFonte(fonte_excluida: string) {
    const i = this.fontes.indexOf(fonte_excluida);
    if (i !== -1) {
      this.fontes.splice(i, 1);
    }
  }
  //#endregion

  //#region Imagens
  protected setPreview(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.src = e.target.result;
        const imageName = file.name;
        this.imagens.push(imageName);
      };
      reader.readAsDataURL(file);
    }
  }

  protected removePreview() {
    this.formDoenca.controls.imagem.reset();
    this.src = null;
    this.imagens = [];
  }
  //#endregion

  //#region Controle de Estado de Erro
  resetErrorStatus() {
    // Detecta mudanças nos campos para resetar o status do erro atual
    Object.keys(this.formDoenca.controls).forEach(control => {
      this.formDoenca.get(control)?.valueChanges.subscribe(() => {
        // Limpando o erro quando o usuário alterar o valor do campo 'senha'
        this.doencaErrorStatus = DoencaErrorStatus.None;
      });
    });
  }

  checkIfFormError(status: string): boolean {
    /* Recebe o valor do enum (em string) e compara com o estado atual do formulário, se forem iguais, retorna true */
    return this.doencaErrorStatus == status
  }
  //#endregion

  //#region Cadastro
  onSubmit() {
    if (this.isFormValid()) {
      if (this.doencaService.validateDoenca(this.formDoenca.controls.nome_doenca.value)) {
        this.createNewDoenca();
        this.router.navigate(['/doenca-inicial']);
      }
      else {
        this.doencaErrorStatus = DoencaErrorStatus.invalidName
      }
    }
    else {
      this.doencaErrorStatus = DoencaErrorStatus.invalidControl
    }
  }

  createNewDoenca() {
    const newDoenca: IDoenca = {
      id: this.doencaService.getCurrentID(),
      nome_doenca: this.formDoenca.controls.nome_doenca.value,
      descricao: this.formDoenca.controls.descricao.value,
      transmissao: this.formDoenca.controls.transmissao.value,
      tratamento: this.formDoenca.controls.tratamento.value,
      sintomas: this.sintomas,
      fontes_doenca: this.fontes,
      imagens_doenca: this.imagens
    }
    console.log(newDoenca);
    this.doencaService.newDoenca(newDoenca);
    this.sweetAlert.showMessage("Doença cadastrada com sucesso");
  }

  private isFormValid(): boolean {
    return this.formDoenca.valid &&
      this.sintomas.length > 0;
  }

  //#endregion
}
