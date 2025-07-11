import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { IUser } from '../models/interface/IUser.model';
import { SweetAlertService } from './sweetAlert.service';
import { LocalStorageService } from './localStorage.service';
import { ErrorService } from './error.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  //https://backend-saneasp.onrender.com/auth
  private API_URL = 'https://backend-saneasp.onrender.com/auth';

  /* Observable para avisar quando um novo usuário é logado */
  private currentUserSubject = new BehaviorSubject<IUser | null>(null);
  currentUser$: Observable<IUser | null> = this.currentUserSubject.asObservable();

  public isAdmin$ = this.currentUser$.pipe(
    map(user => user?.nivel === 1)
  );

  constructor( 
    private httpClient: HttpClient,
    private sweetAlertService: SweetAlertService,
    private localStorageService : LocalStorageService,
    private errorService : ErrorService){
    this.initializeAuth()
  }

  /* Realiza o login ao iniciar o site (ou recarregar) */
  private initializeAuth(){
    const token = this.getAuthToken();

    if(token){
      this.fetchUser().subscribe(); // Atualiza o usuário ativo após realizar req
    }
    else
      this.clearAuth()
  }

  /* Gera o token JWT para login */
  public login(email: string, senha: string) {
    return this.httpClient.post<string>(this.API_URL, {
      email,
      senha,
    }).pipe(
      tap((token) => this.setAuthToken(token)),
      switchMap(() => this.fetchUser()),
      tap(() => this.sweetAlertService.showMessage('Login realizado com sucesso', false)),
      catchError(err => {
        this.clearAuth();
        this.errorService.handleError(err);
        throw err
      })
    );
  }

  /* Adquire dados do usuário atual utilizando o token JWT gerado */
  public fetchUser() : Observable<IUser>{
    const token = this.getAuthToken();

    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', token);
    }

    return this.httpClient.get<IUser>(this.API_URL + '/me', { headers }).pipe(
      tap((u) => this.setCurrentUser(u)),
      catchError(err => {
        this.clearAuth();
        throw err
      })
    );
  }

  /* Adquire o IUser atual logado */
  public getCurrentUser(): IUser | null {
    return this.currentUserSubject.value;
  }

  /* Define o IUser atual logado */
  public setCurrentUser(user: IUser) {
    this.currentUserSubject.next(user);
  }

  public clearAuth(){
    this.removeAuthToken();
    this.currentUserSubject.next(null);
  }

  /* Adquire o token JWT armazenado no localStorage */
  public getAuthToken(): string | null {
    return this.localStorageService.get('access-token')
  }

  /* Define o token JWT armazenado no localStorage */
  public setAuthToken(token : string){
    this.localStorageService.set('access-token',token)
  }

  /* Remove o token JWT armazenado no localStorage */
  public removeAuthToken(){
    this.localStorageService.remove('access-token')
  }
}
