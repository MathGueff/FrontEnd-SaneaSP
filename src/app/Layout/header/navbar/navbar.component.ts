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

  loginInfo$ =  this.authService.currentUser$;
  //Array com links de navegação da navbar
  links : NavbarLink[] =[
    {path: '/reclamacao', img: 'assets/icones/white/reclamacao_icon.svg', alt : 'Ícone do link para página de Reclamação', nome : 'Reclamação'}
  ];
}
