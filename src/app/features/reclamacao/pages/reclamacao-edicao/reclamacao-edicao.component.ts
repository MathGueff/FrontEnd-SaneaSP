
import { Component, inject, OnInit } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ViacepService } from '@shared/services/viacep.service';
import { NotFoundComponent } from '@shared/components/not-found/not-found.component';
import { ICreateReclamacao, IReclamacao } from '@features/reclamacao/models/reclamacao.model';
import { ReclamacaoService } from '@features/reclamacao/services/reclamacao.service';
import { TagSelectComponent } from "@shared/components/tag-select/tag-select.component";
import { ImageSelectComponent } from "@shared/components/image-select/image-select.component";
import { ICategoria } from '@features/categoria/models/categoria.model';
import { SweetAlertService } from '@shared/services/sweet-alert.service';

@Component({
    selector: 'app-reclamacao-edicao',
    imports: [ReactiveFormsModule, NotFoundComponent, TagSelectComponent, ImageSelectComponent],
    templateUrl: './reclamacao-edicao.component.html',
    styleUrl: './reclamacao-edicao.component.css',
    standalone:true
})
export class ReclamacaoEdicaoComponent implements OnInit {
    private reclamacaoService = inject(ReclamacaoService);
    private sweetAlertService = inject(SweetAlertService);
    private formBuider = inject(NonNullableFormBuilder);
    private router = inject(Router);
    private viacepService = inject(ViacepService);
    private activeRouter = inject(ActivatedRoute);

    protected erro : string = "";
    protected vazio : boolean = false;
    protected path :string = "../";
    private tagsID:number[] = [];
    private images : string[] = [];
    protected reclamacao !: IReclamacao;

    rows: number = 5;
    src: any = null;


    form = this.formBuider.group({
      titulo: [this.reclamacao?.titulo, [Validators.required]],
      descricao: [this.reclamacao?.descricao, [Validators.required]],
      cep: [
        this.reclamacao?.cep,
        [Validators.required, Validators.minLength(8), Validators.maxLength(8)],
      ],
      numero: [this.reclamacao?.numero, [Validators.required]],
      cidade: [this.reclamacao?.cidade, [Validators.required]],
      bairro: [this.reclamacao?.bairro, [Validators.required]],
      rua: [this.reclamacao?.rua, [Validators.required]],
      complemento: [this.reclamacao?.complemento]
    });

   async onSubmit() {
      const response = await this.sweetAlertService.confirmUpdate("Confirmar Atualização");
      if (this.form.valid && response) {
          const updateReclamacao: ICreateReclamacao = {
            ...this.form.value as ICreateReclamacao,
            Imagens: this.images,
            Categorias: this.tagsID
          }
          this.reclamacaoService.putReclamacao(updateReclamacao,this.reclamacao.id).subscribe({
            next: ()=>{
              this.sweetAlertService.showMessage("Denúncia Atualizada com sucesso");
              this.router.navigate(['reclamacao']);
            },
            error:()=>{
              this.sweetAlertService.showMessage("Erro ao atualizar denúncia",true)
            }
          })
      }
    }
    ngOnInit(): void {
      this.activeRouter.params.subscribe((params)=>{
        this.reclamacaoService.getByIdReclamacao(Number(params['id'])).subscribe({
          next:(result) => {
            this.reclamacao = result;
            this.inicializeForm(this.reclamacao);
          },
          error:() => {
            if(!this.reclamacao){
              this.vazio = true;
              this.erro = "Denúncia Inexistente";
              return;
            }
          },
        })
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
            console.log('O rua não foi encontrado para o CEP informado.');
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
          objTextArea.rows += 1
          console.log("Scroll Height: "+ objTextArea.scrollHeight);
          console.log("offsetHeight: "+ objTextArea.offsetHeight);
        }
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
    private inicializeForm(reclamacao : IReclamacao):void{
      this.form.patchValue({
        titulo: reclamacao.titulo,
        descricao: reclamacao?.descricao,
        cep: reclamacao.cep,
        cidade: reclamacao.cidade,
        rua: reclamacao.rua,
        bairro: reclamacao.bairro,
        complemento: reclamacao.complemento,
        numero:reclamacao.numero
      });
      this.autoResize()
      this.imagesChange([]);
    }

  protected tagsChange($event: ICategoria[]) {
    this.tagsID = $event.map((tag)=>tag.id)
  }
  protected imagesChange($event: File[]){
    if($event.length > 0){
      $event.map((file)=> this.images.push(file.name));
    }
    else{
      this.reclamacao.Imagens.map((image)=>this.images.push(image.nome))
    }
  }
}
