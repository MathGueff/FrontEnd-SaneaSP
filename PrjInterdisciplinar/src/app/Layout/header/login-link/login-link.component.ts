import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../Services/user.service';
import { AuthService } from '../../../Services/auth.service';
import { SweetAlertService } from '../../../Services/sweetAlert.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-link',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './login-link.component.html',
  styleUrl: './login-link.component.css'
})
export class LoginLinkComponent {
  userAtivo : string | null = null;
  public authService = inject(AuthService);
  private sweetAlertService = inject(SweetAlertService);
  private router = inject(Router)

  @ViewChild('dropdown') dropdown !: ElementRef
  @ViewChild('dropdownLinks') linksDropdown !: ElementRef

  btnLogout(){
    this.authService.clearAuth();
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
