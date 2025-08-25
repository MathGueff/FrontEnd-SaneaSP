import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NavbarLink } from '@shared/models/navbar-link.model';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LoginLinkComponent } from "../login-link/login-link.component";
import { UserService } from '@features/usuario/services/user.service';
import { AuthService } from '@core/services/auth.service';

@Component({
    selector: 'app-navbar',
    imports: [CommonModule, RouterLink, RouterLinkActive, LoginLinkComponent],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css',
    standalone:true
})
export class NavbarComponent {
  protected userService = inject(UserService);
  protected authService = inject(AuthService);

  loginInfo$ =  this.authService.currentUser$;
  //Array com links de navegação da navbar
  links : NavbarLink[] =[
    {path: '/reclamacao', img: 'icons/shared/white/reclamacao_icon.svg', alt : 'Ícone do link para página de Reclamação', nome : 'Denúncias'}
  ];
}
