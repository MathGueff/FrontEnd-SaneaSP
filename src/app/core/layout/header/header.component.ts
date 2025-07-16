import { Component } from '@angular/core';
import { NavbarComponent } from "../header/navbar/navbar.component";
import { RouterLink } from '@angular/router';
import { LoginLinkComponent } from './login-link/login-link.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NavbarComponent,RouterLink, LoginLinkComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
