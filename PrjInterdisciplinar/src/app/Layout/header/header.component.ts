import { Component } from '@angular/core';
import { NavbarComponent } from "./navbar/navbar.component";
import { RouterLink } from '@angular/router';
import { LoginLinkComponent } from './login-link/login-link.component';

@Component({
    selector: 'app-header',
    imports: [NavbarComponent, RouterLink, LoginLinkComponent],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent {

}
