import { Component, inject } from '@angular/core';
import { FormControl, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DoencaService } from '../../Services/doenca.service';
import { IFieldForm } from '../../models/interface/IFieldForm.model';
import { CommonModule } from '@angular/common';
import { CheckErrorComponent } from '../../Common/check-error/check-error.component';
import { FormFieldComponent } from '../../Common/form-field/form-field.component';
import { NoticiaErrorStatus } from '../../models/enums/NoticiaErrorStatus.enum';
import { INoticia } from '../../models/interface/INoticias.model';
import { NoticiaService } from '../../Services/noticia.service';
import { SweetAlertService } from '../../Services/sweetAlert.service';
import { FormValidatorEnum } from '../../models/enums/FormValidatorEnum.enum';

@Component({
    selector: 'app-form-noticia',
    imports: [ReactiveFormsModule, CommonModule, RouterModule, FormFieldComponent, CheckErrorComponent],
    templateUrl: './form-noticia.component.html',
    styleUrl: './form-noticia.component.css'
})
export class FormNoticiaComponent {
  //#region Injections
  private fb = inject(NonNullableFormBuilder);
  private noticiaService = inject(NoticiaService);
  private router = inject(Router);
  private sweetAlert = inject(SweetAlertService);
  //#endregion

  //#region Arrays e Variáveis 
  protected noticiaErrorStatus: NoticiaErrorStatus = NoticiaErrorStatus.None; //Var de erros
  protected tags: string[] = []; //Tags adicionadas
  protected fontes: string[] = []; //Fontes adicionadas
  protected imagem: string = ''; //Imagem adicionada

  src: any = null; // src atual para preview

  //#endregion

  //#region Formulário
  protected formNoticia = this.fb.group({
    titulo_noticia: ['', [Validators.required]],
    descricao_noticia: ['', [Validators.required, Validators.minLength(15)]],
    fonte: [''],
    tag_input: [''],
    tag_select: [''],
    imagem: ['']
  })

  //Configuração dos inputs do formulário

  inputs: IFieldForm[] = [
    {
      controlName: 'titulo_noticia',
      icon: 'assets/icones/black/noticia_icon.svg',
      label: 'Título da notícia:',
      placeholder: 'Digite o título da notícia',
      required: true,
      validators: [FormValidatorEnum.Required]
    },
    {
      controlName: 'descricao_noticia',
      icon: 'img/paginas/reclamacoes/description-icon.svg',
      label: 'Descrição da Notícia:',
      placeholder: 'Descrição da notícia',
      required: true,
      validators: [FormValidatorEnum.Required, FormValidatorEnum.MinLength],
      typeField: 'textarea',
    },
  ];
  //#endregion

  ngOnInit() {
    this.resetErrorStatus();
  }

  //Método para adicionar uma tag por evento (como click ou change)
  //Event -> Previne o comportamento padrão (envio automático do formulário)
  //Type -> O tipo a ser adicionado (fonte ou tag_input/tag_select)
  onEnter(event: Event, type: string): void {
    // 
    event.preventDefault();

    // Adiciona dependendo do tipo de campo
    if (type === 'fonte') {
      this.addFonte();
    } else if (type === 'tag-input') {
      this.addTag(this.formNoticia.controls.tag_input);
    } else if(type === 'tag-select')
      this.addTag(this.formNoticia.controls.tag_select)
  }

  //#region Fontes
  addFonte() {
    const fonte = this.formNoticia.controls.fonte;
    if (fonte.valid && fonte.value != "") {
      let fonte_novo = fonte.value;
      fonte_novo = fonte_novo.trim();
      if (!this.fontes.some((fonte) => fonte == fonte_novo)) {
        fonte.reset();
        this.fontes.push(fonte_novo);
      }
      else {
        this.noticiaErrorStatus = NoticiaErrorStatus.invalidFonte;
      }
    }
    else {
      this.noticiaErrorStatus = NoticiaErrorStatus.nullFonte;
    }
  }

  removeFonte(fonte_excluida: string) {
    const i = this.fontes.indexOf(fonte_excluida);
    if (i !== -1) {
      this.fontes.splice(i, 1);
    }
  }
  //#endregion

  //#region Tags
  addTag(tagControl : FormControl) {
    if (tagControl.valid && this.validateTag(tagControl.value)) {
      let tag_novo = tagControl.value;
      tag_novo = tag_novo.trim();
      if (!this.tags.some((tag) => tag == tag_novo)) {
        this.formNoticia.controls.tag_input.reset()
        this.formNoticia.controls.tag_select.reset()
        this.tags.push(tag_novo);
      }
      else {
        this.noticiaErrorStatus = NoticiaErrorStatus.invalidTag;
      }
    }
    else {
      this.noticiaErrorStatus = NoticiaErrorStatus.nullTag;
    }
  }

  removeTag(tag_excluida: string) {
    const i = this.tags.indexOf(tag_excluida);
    if (i !== -1) {
      this.tags.splice(i, 1);
    }
  }

  validateTag(tag: string) {
    tag = tag.trim().toUpperCase();
    return (tag != "NENHUM" && tag != "" && tag != null);
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
        this.imagem = imageName;
      };
      reader.readAsDataURL(file);
    }
  }

  protected removePreview() {
    this.formNoticia.controls.imagem.reset();
    this.src = null;
    this.imagem = '';
  }
  //#endregion

  //#region Status de Erro
  resetErrorStatus() {
    // Detecta mudanças nos campos para resetar o status do erro atual
    Object.keys(this.formNoticia.controls).forEach(control => {
      this.formNoticia.get(control)?.valueChanges.subscribe(() => {
        // Limpando o erro quando o usuário alterar o valor do campo 'senha'
        this.noticiaErrorStatus = NoticiaErrorStatus.None;
      });
    });
  }

  checkIfFormError(status: string): boolean {
    /* Recebe o valor do enum (em string) e compara com o estado atual do formulário, se forem iguais, retorna true */
    return this.noticiaErrorStatus == status
  }
  //#endregion

  //#region Cadastro
  onSubmit() {
    if (this.formNoticia.valid) {
      if (this.noticiaService.validateNoticia(this.formNoticia.controls.titulo_noticia.value)) {
        this.createNewNoticia();
        this.router.navigate(['/noticia-inicial']);
      }
      else {
        this.noticiaErrorStatus = NoticiaErrorStatus.invalidName
      }
    }
    else {
      this.noticiaErrorStatus = NoticiaErrorStatus.invalidControl
    }
  }
 
  createNewNoticia() {
    const newNoticia: INoticia = {
      id: this.noticiaService.getCurrentID(),
      titulo: this.formNoticia.controls.titulo_noticia.value,
      descricao: this.formNoticia.controls.descricao_noticia.value,
      tags_noticia: this.tags,
      fontes_noticia: this.fontes,
      imagem_noticia: this.imagem,
    }
    console.log(newNoticia);
    this.noticiaService.newNoticia(newNoticia);
    this.sweetAlert.showMessage("Notícia cadastrada com sucesso")
  }

 
  //#endregion
}
