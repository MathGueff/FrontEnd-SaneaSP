import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../Services/user.service';

@Component({
    selector: 'app-login-link',
    imports: [RouterLink],
    templateUrl: './login-link.component.html',
    styleUrl: './login-link.component.css'
})
export class LoginLinkComponent implements OnInit{
  userAtivo : string | null = null;
  private userService = inject(UserService);

  @ViewChild('dropdown') dropdown !: ElementRef
  @ViewChild('dropdownLinks') linksDropdown !: ElementRef
  
  ngOnInit(): void {
    /* Alterando o nome do usuário ativo com Observable */
    this.userService.userAtivo$.subscribe({
        next: (user) => {
          if(user){
            /* Caso não haja usuário ativo, é por padrão "login" */
            this.userAtivo = user.nome;
          }
          else{
            this.userAtivo = null;
          }
        },
        error: (err) => {
          console.log("Erro ao atribuir usuário ativo " + err)
        }
    })
  }

  btnLogout(){
    this.userService.logout();
  }

  toggleLoginDropdown(){
    const dropdown = this.linksDropdown.nativeElement as HTMLElement; 
    if(dropdown.classList.contains("show"))
      dropdown.classList.remove('show');
    else
      dropdown.classList.add('show')
  }
}
