import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NavbarLink } from '../../../models/class/navbar-link';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LoginLinkComponent } from "../login-link/login-link.component";
import { UserService } from '../../../Services/user.service';
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, LoginLinkComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  protected userService = inject(UserService);
  protected authService = inject(AuthService);

  loginInfo$ =  this.authService.getObservableCurrentUser();
  adminInfo$ = this.authService.activeAdmin$; // Observable com as informações do admin
  //Array com links de navegação da navbar
  links : NavbarLink[] =[
    {path: '/doenca-inicial', img: 'assets/icones/white/doenca_icon.svg', alt : 'Ícone do link para página de Doenças', nome : 'Doenças'},
    {path: '/noticia-inicial', img: 'assets/icones/white/noticia_icon.svg', alt : 'Ícone do link para página de Notícias', nome : 'Notícias'},
    {path: '/reclamacao', img: 'assets/icones/white/reclamacao_icon.svg', alt : 'Ícone do link para página de Reclamação', nome : 'Reclamação'}
    //{path: '/pagina-admin', img: 'assets/icones/icon_white_responsavel.svg', alt : 'Ícone do link para página de Reclamação', nome : 'Admin'}

  ];
}
