
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormValidatorEnum } from '@shared/enums/form-validator.enum';

/**
 * COMPONENTE FORM-FIELD
 * @description:
 * - Componente com informações para criação de um input, select ou textArea de um formulário, apresentando mensagens individuais do campo, como validação de tamanho e de obrigatoriedade
 * 
 * @Inputs:
 * - formGroup: FormGroup (obrigatório) - Grupo de formulário reativo
 * - controlName: string (obrigatório) - Nome do controle no FormGroup
 * - formName: string (obrigatório) - Prefixo para IDs e Names do campo (controlName - formName)
 * - icon: string (opcional) - Caminho para ícone do label
 * - label: string (obrigatório) - Texto do label
 * - placeholder: string (opcional) - Placeholder do input
 * - type: string (opcional) - Tipo do input (text, password, etc)
 * - fieldType: 'input' | 'select' | 'textarea' (opcional) - Tipo de campo
 * - selectList: any[] (opcional) - Lista para selects
 * - required: boolean (opcional) - Se exibe asterisco de obrigatório
 * - validators: string[] (opcional) - Validadores do campo
 * 
 * @Outputs:
 * - keydown.enter: Event - Disparado ao pressionar Enter
 * - change: Event - Disparado em mudanças (para selects)
 */
@Component({
    selector: 'app-form-field',
    imports: [ReactiveFormsModule],
    templateUrl: './form-field.component.html',
    styleUrl: './form-field.component.css',
    standalone:true
})
export class FormFieldComponent{
  @Input() formGroup !: FormGroup; //Form gruop utilizado no componente pai
  @Input() formName : string = 'form'; //Usado para concatenar ao nome do campo para gerar names e ids diferentes (controlName + '-' + formName)
  @Input() controlName!: string; //Nome do campo
  @Input() label!: string; //Nome exibido na label
  @Input() icon !: string; //Icone do input
  @Input() type: string = 'text'; //Tipo do input
  @Input() placeholder!: string;  //Placeholder do input
  @Input() fieldType : string = 'input'; //Select, input ou textarea
  @Input() selectList : string[] = [];
  @Input() required !: boolean; //Se o campo é obrigatório (serve para adicionar o asterisco* como forma visual de separar obrigatórios de opcionais)
  @Input() validators : FormValidatorEnum[] = []; 

  /*Retorna a mensagem correspondente ao tipo de validação que os campos possuem
    erro -> string obtida pelo ngFor, obtida da lista de erros passada pelo componente pai em errorValidator
  */
  getErrorMessage(erro : string) : string{
    switch (erro) {
      case 'required':
        return 'Campo obrigatório'

      case 'minlength':
        let minValue = this.formGroup.get(this.controlName)?.errors?.['minlength']?.requiredLength;
        //let minValue = this.formGroup.get(this.controlName)?.errors?.['minlength']?.requiredLength;
        return `Deve ser maior ou igual a ${minValue} ${minValue > 1 ? 'caracteres' : 'caractere'}`

      case 'maxlength':
        let maxValue = this.formGroup.get(this.controlName)?.errors?.['maxlength']?.requiredLength;
        //let maxValue = this.formGroup.get(this.controlName)?.errors?.['maxlength']?.requiredLength;
        return `Deve ser menor ou igual a ${maxValue} ${maxValue > 1 ? 'caracteres' : 'caractere'}`

      case 'email':
        return `Email inválido`

      default:
        return 'Tipo de validação não especificada'
    }
  }
  
  protected showPassword : boolean = false;
  protected passwordIcon : string = 'show_password_icon'

  changeType(){
    this.showPassword = !this.showPassword;
    if(this.showPassword){
      this.type = 'text';
    }
    else{
      this.type = 'password';
    }
  }
}
