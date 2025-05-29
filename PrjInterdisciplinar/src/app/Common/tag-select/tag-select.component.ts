
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ITag } from '../../models/interface/ITag.model';


@Component({
    selector: 'app-tag-select',
    imports: [ReactiveFormsModule],
    templateUrl: './tag-select.component.html',
    styleUrl: './tag-select.component.css'
})
export class TagSelectComponent {
  constructor(private formBuilder:FormBuilder){}
  tags : ITag[] = [
    {
      id:1,
      nomeTag : "Tag1"
    },
    {
      id:2,
      nomeTag : "Tag2"
    },
    {
      id:3,
      nomeTag : "Tag3"
    },
    {
      id:4,
      nomeTag : "Tag4"
    },
  ];
  form = new FormGroup({
    tagsSelecteds: new FormControl('')
  });
  selecionarTags(){
    
  }
}
