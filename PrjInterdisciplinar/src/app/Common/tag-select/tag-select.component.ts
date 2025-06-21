import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ITag } from '../../models/interface/ITag.model';
import { TagService } from '../../Services/tag.service';


@Component({
  selector: 'app-tag-select',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tag-select.component.html',
  styleUrl: './tag-select.component.css'
})
export class TagSelectComponent implements OnInit {
  private tagService = inject(TagService);
  public formTags !: ITag[];
  protected tagNull : ITag = {
    id: 0,
    nome: "Nenhum"
  }
  public select = new FormControl<ITag>(this.tagNull);
  @Input() public tagSelected : ITag[] = [];
  @Output() public alertSelected = new EventEmitter<ITag[]>();

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

 protected RemoveTagSelect( tag: ITag){
  let index = this.tagSelected.indexOf(tag)
  if(index !== -1){
    this.tagSelected.splice(index,1);
    this.alertSelected.emit(this.tagSelected);
  }
 }

}


