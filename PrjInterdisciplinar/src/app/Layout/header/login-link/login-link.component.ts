import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../Services/user.service';
import { AuthService } from '../../../Services/auth.service';
import { SweetAlertService } from '../../../Services/sweetAlert.service';

@Component({
  selector: 'app-login-link',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './login-link.component.html',
  styleUrl: './login-link.component.css'
})
export class LoginLinkComponent implements OnInit{
  userAtivo : string | null = null;
  private authService = inject(AuthService);
  private sweetAlertService = inject(SweetAlertService);
  private router = inject(Router)

  @ViewChild('dropdown') dropdown !: ElementRef
  @ViewChild('dropdownLinks') linksDropdown !: ElementRef
  
  ngOnInit(): void {
    /* Alterando o nome do usuário ativo com Observable */
    this.authService.getObservableCurrentUser().subscribe({
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
    this.authService.logout();
    this.router.navigate(['/login'])
    this.sweetAlertService.showMessage('Você se desconectou da sua conta')
  }

  toggleLoginDropdown(){
    const dropdown = this.linksDropdown.nativeElement as HTMLElement; 
    if(dropdown.classList.contains("show"))
      dropdown.classList.remove('show');
    else
      dropdown.classList.add('show')
  }
}
