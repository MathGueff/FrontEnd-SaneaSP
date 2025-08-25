
import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'app-comentario-input',
    imports: [ReactiveFormsModule],
    templateUrl: './comentario-input.component.html',
    styleUrl: './comentario-input.component.css'
})
export class ComentarioInputComponent {

  rows: number = 0;
  inputText : FormGroup;

  constructor(private formBuilder : FormBuilder){
    this.inputText = this.formBuilder.group({
      textForm:['', Validators.required]
    })
  }

  //Gerencia quantas linhas terá o <textarea>
  autoResize():void {
    let objTextArea = document.querySelector('textarea');
    if (objTextArea?.value) {
      if (objTextArea.scrollHeight > objTextArea.offsetHeight) {
        this.rows += 1;
      }
    } else {
      this.rows = 0;
    }
  }
  onSubmit() {

    if(this.inputText.valid){
      let mensagem = this.inputText.value.textForm;
      console.log(mensagem);
    }
    else{
      console.log('Mensagem vazia');
    }
  }
}
