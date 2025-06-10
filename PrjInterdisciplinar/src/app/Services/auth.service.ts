import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { IUser } from '../models/interface/IUser.model';
import { SweetAlertService } from './sweetAlert.service';
import { LocalStorageService } from './localStorage.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private API_URL = 'http://localhost:3000/auth';

  /* Observable para avisar quando um novo usuário é logado */
  private activeUserSubject = new BehaviorSubject<IUser | null>(null);
  activeUser$: Observable<IUser | null> = this.activeUserSubject.asObservable();

  // Observable para rastrear se o usuário atual é admin
  private activeAdminSubject = new BehaviorSubject<IUser | null>(null);
  activeAdmin$: Observable<IUser | null> = this.activeAdminSubject.asObservable();

  constructor( 
    private httpClient: HttpClient,
    private sweetAlertService: SweetAlertService,
    private localStorageService : LocalStorageService){
    this.loginAtStartApplication()
  }

  /* Realiza o login ao iniciar o site (ou recarregar) */
  private loginAtStartApplication(){
    if (this.getAuthToken()) {
      this.login().subscribe({
        next: (response) => {
          this.setCurrentUser(response);
        },
        error: (e) => {
          this.logout()
          this.sweetAlertService.showMessage(e.error.message, true);
        },
      });
    }
  }

  /* Adquire o IUser atual logado */
  public getCurrentUser(): IUser | null {
    return this.activeUserSubject.value;
  }

  /* Define o IUser atual logado */
  public setCurrentUser(user: IUser) {
    this.activeUserSubject.next(user);
    if (user.nivel == 1) this.activeAdminSubject.next(user);
  }

  /* Gera o token JWT para login */
  public autenticate(email: string, senha: string) {
    return this.httpClient.post<string>(this.API_URL, {
      email,
      senha,
    });
  }

  /* Adquire dados do usuário atual utilizando o token JWT gerado */
  public login() {
    const token = this.getAuthToken();

    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', token);
    }

    return this.httpClient.get<IUser>(this.API_URL + '/me', { headers });
  }

  /* Remove todos os dados armazenados do usuário logado */
  public logout() {
    this.removeAuthToken();
    this.activeUserSubject.next(null);
    this.activeAdminSubject.next(null);
  }

  /* Adquire o token JWT armazenado no localStorage */
  public getAuthToken(): string | null {
    return this.localStorageService.get('access-token')
  }

  /* Adquire o token JWT armazenado no localStorage */
  public setAuthToken(token : string){
    this.localStorageService.set('access-token',token)
  }

  public removeAuthToken(){
    this.localStorageService.remove('access-token')
  }

  /* Adquire o Observable de usuario ativo */
  getObservableCurrentUser():Observable<IUser|null>{
    return this.activeUser$
  }
}
