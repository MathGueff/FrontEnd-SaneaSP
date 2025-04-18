import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { ModalType } from '../../models/enums/ModalType.enum';
import { IModalTagInfos } from '../../models/interface/IModalTagInfos';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormFieldComponent } from '../../Common/form-field/form-field.component';
import { FormValidatorEnum } from '../../models/enums/FormValidatorEnum.enum';
import { TagService } from '../../Services/tag.service';
import { ITag } from '../../models/interface/ITag.model';
import { SweetAlertService } from '../../Services/sweetAlert.service';
import { ISearchFeedback } from '../../models/interface/ISearchFeedback.model';
import { IResponse } from '../../models/interface/IResponse.model';
import { ToastComponent } from "../../Common/toast/toast.component";
import { ToastService } from '../../Services/toast.service';

@Component({
  selector: 'app-tag-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormFieldComponent, ToastComponent],
  templateUrl: './tag-modal.component.html',
  styleUrl: './tag-modal.component.css',
})
export class TagModalComponent {
  // === INPUTS ==============================
  @Input() modalId!: string;
  @Input() modalTypeSelected!: ModalType;

  // === INJECTIONS  ==============================
  private fb = inject(NonNullableFormBuilder);
  protected tagService = inject(TagService);
  private sweetAlertService = inject(SweetAlertService);
  private toastService = inject(ToastService)

  //=== FORMS  ==============================
  protected formCadastroTag = this.fb.group({
    nomeNovaTag: ['', [Validators.required, Validators.minLength(2)]],
  });

  protected formPesquisaTag = this.fb.group({
    nomePesquisaTag: ['', Validators.required],
  });

  protected formEditTag = this.fb.group({
    nomeEditTag: ['', [Validators.required, Validators.minLength(2)]],
  });

  // === ENUMS  ==============================
  formValidatorsEnum = FormValidatorEnum;
  modalTypes = ModalType;

  //=== STATE VARIABLES  ==============================
  protected searchFeedback: ISearchFeedback = {
    message: '',
    imagePath: '',
  };
  protected tagList: ITag[] = this.tagService.getTagsList();
  protected tagFound: ITag | undefined;

  // === GETTERS  ==============================
  get ModalInfo(): IModalTagInfos {
    const modalInfoMap: Record<ModalType, IModalTagInfos> = {
      [ModalType.None]: {
        title: 'Informe o tipo de modal',
        buttonText: 'Tipo faltando',
      },
      [ModalType.Adicao]: {
        title: 'Cadastre uma nova tag',
        buttonText: 'Salvar tag',
      },
      [ModalType.Edicao]: {
        title: 'Edite a tag',
        buttonText: 'Confirmar edição',
      },
      [ModalType.Exclusao]: {
        title: 'Excluir a tag',
        buttonText: 'Excluir',
      },
    };
    return modalInfoMap[this.modalTypeSelected] || modalInfoMap[ModalType.None];
  }

  get FormGroupSelected() {
    // Para Adição, usa formCadastroTag
    switch (this.modalTypeSelected) {
      case ModalType.Adicao:
        return this.formCadastroTag
      case ModalType.Edicao:
        return this.formEditTag
      default:
        break;
    }
    return this.formCadastroTag; // fallback
  }

  //=== VIEW CHILDREN  ==============================
  @ViewChild('botaoChamarModal')
  botaoChamarModalRef!: ElementRef;
  @ViewChild('botaoFecharModal')
  botaoFecharModalRef!: ElementRef;
  @ViewChild('modalTag') modalTagRef =
    {} as ElementRef;

  //=== MODAL ACTIONS  ==============================
  onSubmit() {
    switch (this.modalTypeSelected) {
      case ModalType.Adicao:
        this.handleTagCreation();
        break;
      case ModalType.Edicao:
        this.handleTagEdit();
        break;
      case ModalType.Exclusao:
        this.handleTagDelete();
        break;
    }
  }

  //Quando o botão de Criar é pressionado
  handleTagCreation() {
    if (this.formCadastroTag.invalid) return;

    const newTag: ITag = {
      id: 0,
      nome: this.formCadastroTag.controls.nomeNovaTag.value,
    };

    const result = this.tagService.createNewTag(newTag);
    
    this.toastService.show(result)

    if(!result.error)
      this.formCadastroTag.reset();
  }

  //Quando o botão de Editar ou Excluir é pressionado
  handleTagEdit() {
    if (this.formPesquisaTag.invalid) return;
  
    if (this.tagFound) {
      if(this.formEditTag.invalid){
        this.toastService.show({ 
          message: this.formEditTag.controls.nomeEditTag.valid ? 'O novo nome da tag não foi informado' : 'A tag deve ser maior que 1 caracter',
          error: true,
        })
        return
      }
      const updatedTag = {
        id: this.tagFound.id,
        nome : this.formEditTag.controls.nomeEditTag.value
      }
      const result : IResponse = this.tagService.editTag(this.tagFound.id, updatedTag)
      if(!result.error){
        this.formEditTag.reset()
        this.resetSearchForm()
      }
      this.toastService.show(result)
    } else {
      this.toastService.show({message: 'Nenhuma tag foi encontrada', error: true })
    }
  }

  handleTagDelete(){
    if(this.formPesquisaTag.invalid) return;

    if(this.tagFound){
      this.showDeleteConfirmation(`Deseja deletar a tag ${this.tagFound.nome}?`);
    }
    else{
      this.toastService.show({
        message : "Nenhuma tag foi encontrada",
        error : true
      })
    }
  }

  handleTagConfirmationDelete(){
    if(this.tagFound == undefined) 
      return
    const result = this.tagService.deleteTag(this.tagFound.id)
    if(!result.error) 
      this.resetSearchForm();
    this.toastService.show(result);
  }

  //Quando uma tag é digitada em um campo nos modais de
  onInputTag() {
    const searchInput = this.formPesquisaTag.controls.nomePesquisaTag;

    if (searchInput.value.length == 0) {
      this.resetSearch();
      return;
    }
    
    this.tagList = this.tagService.getTagsByName(searchInput.value).data || [];
    this.updateTagFound(this.formPesquisaTag.controls.nomePesquisaTag.value);

    if (
      this.tagList.length == 0 &&
      this.tagFound == undefined &&
      searchInput.value.length != 0
    ) {
      this.setSearchFeedback(false);
    }
  }

  //=== SEARCH METHODS  ==============================
  
  //Limpa o objeto com a tag encontrada e redefine a lista de tags visiveis
  resetSearch() {
    this.tagList = this.tagService.getTagsList() || [];
    this.tagFound = undefined;
  }

  //Utiliza o resetSearch e reseta o formulário
  resetSearchForm(){
    this.formPesquisaTag.reset()
    this.resetSearch();
  }

  selectTagFromList(nomeSelecionado: string) {
    this.formPesquisaTag.controls.nomePesquisaTag.setValue(nomeSelecionado);
    const tagName = this.formPesquisaTag.controls.nomePesquisaTag.value
    this.updateTagFound(tagName);
    this.tagList = [];
  }

  updateTagFound(tagName : string){
    const tagSearch = this.tagService.getTagByName(tagName)
    tagSearch.data 
      ? this.tagFound = tagSearch.data 
      : this.tagFound = undefined
    this.setSearchFeedback(!tagSearch.error);
  }

  setSearchFeedback(found: boolean) {
    this.searchFeedback = {
      message: found ? 'Tag encontrada: ' + this.tagFound?.nome : 'Nenhuma tag encontrada!',
      imagePath: found 
        ? 'assets/icones/operacoes/black/icon_success.svg' 
        : 'assets/icones/operacoes/black/icon_error.svg'
    };
  }

  //=== SWEETALERT  ==============================
  showDeleteConfirmation(message: string) {
    this.closeModal();
    this.sweetAlertService
      .confirmExclusion(message)
      .then((result) => {
        if (result) {
          this.handleTagConfirmationDelete();
        }
        this.OpenModal();
      });
  }

  //=== MODAL  ==============================
  closeModal() {
    //Chamada para botão de fechar modal (usado para interação entre modal e sweetAlert)
    this.botaoFecharModalRef.nativeElement.click();
  }

  OpenModal() {
    //Chamada para botão de chamar modal (usado para interação entre modal e sweetAlert)
    this.botaoChamarModalRef.nativeElement.click();
  }
}
