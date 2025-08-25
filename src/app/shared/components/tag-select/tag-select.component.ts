
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ICategoria } from '@features/categoria/models/categoria.model';
import { TagService } from '@features/categoria/services/tag.service';


@Component({
    selector: 'app-tag-select',
    imports: [ReactiveFormsModule],
    templateUrl: './tag-select.component.html',
    styleUrl: './tag-select.component.css',
    standalone:true
})
export class TagSelectComponent implements OnInit {
  private tagService = inject(TagService);
  public formTags !: ICategoria[];
  protected tagNull : ICategoria = {
    id: 0,
    nome: "Nenhum"
  }
  public select = new FormControl<ICategoria>(this.tagNull);
  @Input() public tagSelected : ICategoria[] = [];
  @Input( ) public isFiltro : boolean = false;
  @Output() public alertSelected = new EventEmitter<ICategoria[]>();
  @Output() public Buscar = new EventEmitter()

  ngOnInit(): void {
    this.tagService.getTagsList().subscribe({
      next: (tags) => this.formTags = tags.data
    })

    this.select.valueChanges.subscribe((tag)=>{
      if(tag){
        if(tag.id !== 0){
          const existsTag = this.tagSelected.find((tagArray) => tagArray.id === tag.id)
          if(!existsTag){
            this.tagSelected.push(tag);

          }
        }
      }
      this.alertSelected.emit(this.tagSelected);
    })
  }

 protected RemoveTagSelect( tag: ICategoria){
  let index = this.tagSelected.indexOf(tag)
  if(index !== -1){
    this.tagSelected.splice(index,1);
  }
  this.alertSelected.emit(this.tagSelected);
 }

}


