import { AfterViewInit, Component, ElementRef, EventEmitter, inject, Input, OnInit, Output, ViewChild } from '@angular/core';
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
import { ToastComponent } from "../../Common/toast/toast.component";
import { ToastService } from '../../Services/toast.service';
import { Observable, of } from 'rxjs';
import { ITagCadastro } from '../../models/interface/ITagCadastro.model';
import { ITagListFilter } from '../../models/interface/ITagListFilter.interface';

@Component({
  selector: 'app-tag-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormFieldComponent, ToastComponent],
  templateUrl: './tag-modal.component.html',
  styleUrl: './tag-modal.component.css',
})
export class TagModalComponent implements AfterViewInit{
  
  // === INPUTS ==============================
  @Input() tagSelectedInput ?: ITag;
  @Input() modalTypeSelected !: ModalType;
  
  // === OUTPUT ==============================
  @Output() submitModalEvent: EventEmitter<void> = new EventEmitter<void>();

  //=== Ng  ==============================
  private observerModalOpen !: MutationObserver
  protected LIMIT_SEARCH : number = 5

  ngAfterViewInit(): void {
    if (typeof document === 'undefined') return;
  
    if (!this.modalElement) return;
  
    //MutationObserver para detectar sempre que a classe do elemento é alterada para show e executar o código
     this.observerModalOpen = new MutationObserver(() => {
      if (this.modalElement.nativeElement.classList.contains('show')) {
        this.updateTagListOnOpenModal();
        this.setTagOnOpenModal();
      }
    });
  
    this.observerModalOpen.observe(this.modalElement.nativeElement, {
      attributes: true,
      attributeFilter: ['class']
    });
  }

  ngOnDestroy(): void {
    if (this.observerModalOpen) {
      this.observerModalOpen.disconnect();
    }
  }

  //=== MODAL  ==============================

  updateTagListOnOpenModal(){
    if(this.formPesquisaTag.controls.nomePesquisaTag.value.length == 0){
      this.tagService.getTagsList({limit : this.LIMIT_SEARCH}).subscribe((response) => {
        this.tagList$ = of(response.data || []);
      })
      this.isExpandedTagList = false;
    }
  }

  setTagOnOpenModal(){
    if(this.tagSelectedInput == undefined)
      this.resetSearchForm();
    if((this.modalTypeSelected == ModalType.Edicao || this.modalTypeSelected == ModalType.Exclusao) && this.tagSelectedInput != undefined){
      this.formPesquisaTag.controls.nomePesquisaTag.setValue(this.tagSelectedInput?.nome || "")
      this.selectTagFromList(this.tagSelectedInput?.nome || "")
    }
  }

  closeModal() {
    //Chamada para botão de fechar modal (usado para interação entre modal e sweetAlert)
    this.botaoFecharModalRef.nativeElement.click();
  }

  OpenModal() {
    //Chamada para botão de chamar modal (usado para interação entre modal e sweetAlert)
    this.botaoChamarModalRef.nativeElement.click();
  }

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
  protected isExpandedTagList : boolean = false;

  protected tagList$ : Observable<any> = of([]);
  protected tagCount$ : Observable<number> = this.tagService.getTagCount();
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
  @ViewChild('modalTag') modalElement !: ElementRef

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
    if (this.formCadastroTag.invalid){
      if(this.formCadastroTag.controls.nomeNovaTag.value.length == 0)
        this.toastService.show({error: true, message: "Digite o nome da Tag"})
      else if(this.formCadastroTag.controls.nomeNovaTag.invalid)
        this.toastService.show({error: true, message: "O nome da tag deve ser maior"})
      return;
    };

    const newTag: ITagCadastro = {
      nome: this.formCadastroTag.controls.nomeNovaTag.value,
    };

    this.tagService.createNewTag(newTag).subscribe({
      next: (response) => {
        this.toastService.show(response)
        if(!response.error){
          this.formCadastroTag.reset();
          this.submitModalEvent.emit();
        }
        
      },
      error: (err) => {
        this.toastService.show(err.error)
      }
    });
  }

  //Quando o botão de Editar ou Excluir é pressionado
  handleTagEdit() {
    if (this.tagFound == undefined){
      this.toastService.show({ 
        error: true,
        message: "Escolha uma tag válida para começar a editar"
      })
      return
    } 
  
    if(this.formEditTag.invalid){
      this.toastService.show({ 
        message: this.formEditTag.controls.nomeEditTag.value.length == 0 ? 'Digite o novo nome para a tag' : 'O nome da tag deve ser maior',
        error: true,
      })
      return
    }

    const updatedTag = {
      id: this.tagFound.id,
      nome : this.formEditTag.controls.nomeEditTag.value
    }

    this.tagService.editTag(this.tagFound.id, updatedTag).subscribe({
      next: (response) => {
        this.toastService.show(response)
        if(!response.error){
          this.formEditTag.reset()
          this.submitModalEvent.emit();
          this.resetSearchForm()
        }
      },
      error: (err) =>{
        this.toastService.show(err.error)
      }
    })
  }

  handleTagDelete(){
    if (this.tagFound == undefined){
      this.toastService.show({ 
        error: true,
        message: "Escolha uma tag válida para excluir"
      })
      return
    } 
    this.showDeleteConfirmation(`Deseja deletar a tag: "${this.tagFound.nome}"?`);
  }

  handleTagConfirmationDelete(){
    if(this.tagFound == undefined) 
      return
    this.tagService.deleteTag(this.tagFound.id).subscribe({
      next: (response) => {
        this.toastService.show(response);
        if(!response.error) {
          this.resetSearchForm();
          this.submitModalEvent.emit();
        }
      },
      error : (err) => {
        this.toastService.show(err.error);
        this.resetSearchForm();
      }
    })
    
  }

  //Quando uma tag é digitada em um campo nos modais de pesquisa
  onInputTag() {
    const searchInput = this.formPesquisaTag.controls.nomePesquisaTag;

    if (searchInput.value.length == 0) {
      this.resetTagSearchProgress();
      return;
    }
    
    // Faz a busca e atualiza a lista de tags
    this.tagService.getTagsList({nome : searchInput.value, limit: this.LIMIT_SEARCH}).subscribe(response => {
      // Atualiza o Observable tagList$ com as novas tags
      this.tagList$ = of(response.data || []);
      //this.updateTagFound(this.formPesquisaTag.controls.nomePesquisaTag.value);
      this.tagFound = undefined;
    });
  }

  //=== SEARCH METHODS  ==============================
  
  //Limpa o objeto com a tag encontrada e redefine a lista de tags visiveis
  resetTagSearchProgress() {
    this.tagService.getTagsList({limit : this.LIMIT_SEARCH}).subscribe((response) => {
      this.tagList$ = of(response.data || [])
    })
    this.tagFound = undefined;
    this.isExpandedTagList = false;
  }

  //Utiliza o resetSearch e reseta o formulário
  resetSearchForm(){
    this.formPesquisaTag.reset()
    this.resetTagSearchProgress();
  }

  selectTagFromList(nomeSelecionado: string) {
    this.formPesquisaTag.controls.nomePesquisaTag.setValue(nomeSelecionado);
    const tagName = this.formPesquisaTag.controls.nomePesquisaTag.value
    this.setTagFound(tagName);
    this.tagList$ = of([])
  }

  setTagFound(tagName : string){
    this.tagService.getTagByExactName(tagName).subscribe({
      next : (response) => {
        this.tagFound = response.data
        this.formEditTag.controls.nomeEditTag.setValue(tagName);
      },
      error: (err) => {
        this.tagFound = undefined
      }
    })
  }

  expandSearchList(){
    const searchInput = this.formPesquisaTag.controls.nomePesquisaTag.value
    const query  : ITagListFilter = {}

    if(searchInput.length > 0)
      query.nome = searchInput
    if(this.isExpandedTagList)
      query.limit = this.LIMIT_SEARCH

      this.tagService.getTagsList(query).subscribe((response) => {
        this.tagList$ =  of(response.data || [])
        this.isExpandedTagList = !this.isExpandedTagList
    })
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
}
