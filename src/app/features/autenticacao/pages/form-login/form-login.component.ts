
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '@features/usuario/services/user.service';
import { IFieldForm } from '@shared/models/field-form.model';
import { FormFieldComponent } from "@shared/components/form-field/form-field.component";
import { FormValidatorEnum } from '@shared/enums/form-validator.enum';
import { ToastService } from '@shared/services/toast.service';
import { AuthService } from '@core/services/auth.service';
import { SweetAlertService } from '@shared/services/sweet-alert.service';

@Component({
    selector: 'app-form-login',
    imports: [RouterModule, ReactiveFormsModule, FormFieldComponent],
    templateUrl: './form-login.component.html',
    styleUrls: ['./form-login.component.css', '../links-redes.css'],
    standalone:true
})

export class FormLoginComponent{
  formName : string = "login";
  /* Injeção de Dependências */
  private formBuilderService = inject(NonNullableFormBuilder);
  private router = inject(Router);
  private userService = inject(UserService)
  private authService = inject(AuthService)
  private toastService = inject(ToastService)
  private sweetAlertService = inject(SweetAlertService)

  @ViewChild('formFeedback') formFeedback !: ElementRef;
  
  /* Reactive Form */
  protected formLogin = this.formBuilderService.group({
    email : ['', [Validators.required, Validators.email]],
    senha : ['', [Validators.required, Validators.minLength(4)]]
  })
  
  inputs : IFieldForm[] = [
    { 
      controlName:'email', 
      type : 'email',
      icon:'images/login/email_icon.svg', 
      label:'Email:', 
      placeholder: 'Email de login', 
      required: true, 
      validators: [FormValidatorEnum.Required, FormValidatorEnum.Email]
    },
    { 
      controlName:'senha', 
      type : 'password',
      icon:'images/login/senha_icon.svg', 
      label:'Senha:', 
      placeholder: 'Senha de login', 
      required: true, 
      validators: [FormValidatorEnum.Required, FormValidatorEnum.MinLength]
    }
  ]

  /* Método chamado com o btn submit */
  onSubmit(){
    if(this.formLogin.valid){  //Caso o formulário seja válido
      let email = this.formLogin.controls.email.value;
      let senha = this.formLogin.controls.senha.value;
      //Chamando função para verificar usuário      
      this.login(email, senha);
    }
    else{
      this.toastService.show({
        message : 'Todos os campos obrigatórios devem ser preenchidos',
        error: true
      })
    }
  }

  /* Verificação de login */
  login(email : string, senha : string){
    this.authService.login(email, senha).subscribe({
      next : (user) => {
        this.router.navigate([user.nivel == 0
          ? '/'
          : '/pagina-admin'
        ])
      }
    })
  }
}
