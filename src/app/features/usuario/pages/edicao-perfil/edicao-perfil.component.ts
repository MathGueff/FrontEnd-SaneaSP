
import { Component, inject, OnInit } from '@angular/core';
import { FormFieldComponent } from '@shared/components/form-field/form-field.component';
import { UserService } from '@features/usuario/services/user.service';
import { ViacepService } from '@shared/services/viacep.service';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IFieldForm } from '@shared/models/field-form.model';
import { RegistrationErrorEnum } from '@shared/enums/registration-error.enum';
import { Router } from '@angular/router';
import { FormValidatorEnum } from '@shared/enums/form-validator.enum';
import { AuthService } from '@core/services/auth.service';

@Component({
    selector: 'app-edicao-perfil',
    imports: [FormFieldComponent, ReactiveFormsModule],
    templateUrl: './edicao-perfil.component.html',
    styleUrl: './edicao-perfil.component.css',
    standalone:true
})
export class EdicaoPerfilComponent implements OnInit {
  protected cadastroErrorStatus: RegistrationErrorEnum = RegistrationErrorEnum.None;
  private formBuilderService = inject(NonNullableFormBuilder);
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private viacepService = inject(ViacepService);
  private router = inject(Router);

  protected user = this.authService.getCurrentUser(); // obtem o objeto Usuario

  formName: string = 'cadastro'; //Nome do formulário para concatenar ao nome do control (email-cadastro)
  passwordMinLength = 6;

  protected formCadastro = this.formBuilderService.group({
    nome: [this.user?.nome, [Validators.required, Validators.minLength(2)]],
    email: [this.user?.email, [Validators.required, Validators.email]],
    senha: [
      this.user?.senha,
      [Validators.required, Validators.minLength(this.passwordMinLength)],
    ],
    confirmaSenha: [
      this.user?.senha,
      [Validators.required, Validators.minLength(this.passwordMinLength)],
    ],
    telefone: [
      this.user?.telefone,
      [Validators.minLength(11), Validators.maxLength(11)],
    ], //Opcional
    cpf: [this.user?.cpf, [Validators.minLength(11), Validators.maxLength(11)]],
    cep: [
      this.user?.endereco?.cep,
      [Validators.minLength(8), Validators.maxLength(8)],
    ], //Opcional
    numero: [this.user?.endereco?.numero], //Opcional
    logradouro: [this.user?.endereco?.logradouro], //Opcional
    bairro: [this.user?.endereco?.bairro], //Opcional
    localidade: [this.user?.endereco?.cidade], //Opcional
    complemento: [this.user?.endereco?.complemento], // Opcional
  });
  inputs: IFieldForm[] = [
    {
      controlName: 'nome',
      type: 'text',
      icon: 'images/login/usuario_icon.svg',
      label: 'Nome:',
      placeholder: 'Nome de usuário',
      required: true,
      validators: [FormValidatorEnum.Required, FormValidatorEnum.MinLength],
    },
    {
      controlName: 'email',
      type: 'email',
      icon: 'images/login/email_icon.svg',
      label: 'Email:',
      placeholder: 'Email de usuário',
      required: true,
      validators: [FormValidatorEnum.Required, FormValidatorEnum.Email],
    },
    {
      controlName: 'senha',
      type: 'password',
      icon: 'images/login/senha_icon.svg',
      label: 'Senha:',
      placeholder: 'Senha de login',
      required: true,
      validators: [FormValidatorEnum.Required, FormValidatorEnum.MinLength],
    },
    {
      controlName: 'confirmaSenha',
      type: 'password',
      icon: 'images/login/senha_icon.svg',
      label: 'Confirme sua senha:',
      placeholder: 'Confirmação da senha',
      required: true,
      validators: [FormValidatorEnum.Required, FormValidatorEnum.MinLength],
    },
    {
      controlName: 'telefone',
      type: 'tel',
      icon: 'images/login/telefone_icon.svg',
      label: 'Telefone:',
      placeholder: 'Telefone para contato',
      required: false,
      validators: [FormValidatorEnum.MaxLength, FormValidatorEnum.MinLength],
    },
    {
      controlName: 'cpf',
      type: 'text',
      icon: 'images/login/cpf_icon.svg',
      label: 'CPF:',
      placeholder: 'Digite seu CPF',
      required: false,
      validators: [FormValidatorEnum.MaxLength, FormValidatorEnum.MinLength],
    },
  ];

  addressInputs: IFieldForm[] = [
    {
      controlName: 'cep',
      type: 'text',
      icon: 'images/login/endereco_icon.svg',
      label: 'CEP:',
      placeholder: 'Digite seu CEP',
      required: false,
      validators: [FormValidatorEnum.MaxLength, FormValidatorEnum.MinLength],
    },
    {
      controlName: 'logradouro',
      type: 'text',
      icon: 'images/login/endereco_icon.svg',
      label: 'Rua:',
      placeholder: 'Digite sua rua',
      required: false,
    },
    {
      controlName: 'bairro',
      type: 'text',
      icon: 'images/login/endereco_icon.svg',
      label: 'Bairro:',
      placeholder: 'Digite seu bairro',
      required: false,
    },
    {
      controlName: 'localidade',
      type: 'text',
      icon: 'images/login/endereco_icon.svg',
      label: 'Cidade:',
      placeholder: 'Digite sua cidade',
      required: false,
    },
    {
      controlName: 'numero',
      type: 'text',
      icon: 'images/login/endereco_icon.svg',
      label: 'Número:',
      placeholder: 'Digite seu número',
      required: false,
    },
    {
      controlName: 'complemento',
      type: 'text',
      icon: 'images/login/endereco_icon.svg',
      label: 'Complemento:',
      placeholder: 'Digite seu complemento',
      required: false,
    },
  ];

  /* Método para verificar status do enum (CadastroErrorStatus.enum) */
  checkIfFormError(status: string): boolean {
    /* Recebe o valor do enum (em string) e compara com o estado atual do formulário, se forem iguais, retorna true */
    return this.cadastroErrorStatus == status;
  }

  onSubmit() {
    //Verifica se o todos os campos obrigatórios foram preenchidos
    if (this.formCadastro.valid) {
      console.log('Formulário editado com sucesso');
      this.router.navigate(['']);
    }
  }
  ngOnInit(): void {
    //Verifica se estiver um usuário logado, caso não tenha, a página é direcionada para página inicial
    if (this.user === null) {
      this.router.navigate(['']);
    }

    // Detecta mudanças nos campos para resetar o status do erro atual
    Object.keys(this.formCadastro.controls).forEach((control) => {
      if (control != 'cep') {
        this.formCadastro.get(control)?.valueChanges.subscribe(() => {
          // Limpando o erro quando o usuário alterar o valor do campo 'senha'
          this.cadastroErrorStatus = RegistrationErrorEnum.None;
        });
      }
    });

    //VIACEP
    this.formCadastro.controls.cep.valueChanges.subscribe(() => {
      if (this.formCadastro.controls.cep !== undefined) {
        if (
          this.formCadastro.controls.cep.valid &&
          this.formCadastro.controls.cep?.value?.length == 8
        ) {
          this.searchAddress(this.formCadastro.controls.cep.value);
        } else {
          console.log('CEP INVÁLIDO');
          this.resetAddressControls();
        }
      }
    });
  }
  searchAddress(cep: string) {
    this.viacepService.getAddress(cep).subscribe({
      next: (response) => {
        if (response.logradouro) {
          this.setAddressControl('logradouro', response.logradouro);
        } else {
          console.log('O logradouro não foi encontrado para o CEP informado.');
        }

        if (response.bairro) {
          this.setAddressControl('bairro', response.bairro);
        } else {
          console.log('O logradouro não foi encontrado para o CEP informado.');
        }

        if (response.localidade) {
          this.setAddressControl('localidade', response.localidade);
        } else {
          console.log('O logradouro não foi encontrado para o CEP informado.');
        }
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  resetAddressControls() {
    let addressControls = ['logradouro', 'bairro', 'localidade'];
    addressControls.forEach((field) => {
      this.formCadastro.get(field)!.reset();
    });
  }

  private setAddressControl(control: string, value: string) {
    this.formCadastro.get(control)?.setValue(value);
  }
}
