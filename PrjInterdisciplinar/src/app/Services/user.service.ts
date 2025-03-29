import { IUser } from './../models/user.model';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { UserMockService } from './user-mock.service';
import { AdminService } from './admin.service';
import { IAdmin } from '../models/admin.model';
import { SweetAlertService } from './sweetAlert.service';
import { isNull } from 'util';

@Injectable({ providedIn: 'root' })
export class UserService {

  //Injeção de Dependências
  private userMockService = inject(UserMockService);
  private users: IUser[] = [];
  private adminService = inject(AdminService);

  constructor(private sweetAlert : SweetAlertService) {
    // Carrega os usuários ao inicializar o serviço
    //this.loadUsers();
    this.loadFallbackUsers();
    // Verificando se o usuário ativo é admin
    this.userAtivo$.subscribe((user) => {
        if (user) {
          this.checkIfAdmin(user);
        } else {
          this.adminSubject.next(null); // Nenhum usuário ativo implica não é admin
        }
      });
  }

  // Método para carregar usuários da API
  private loadUsers(): void {
    this.userMockService.getUsersList().subscribe({
      next: (response: any) => {
        if (response.usuarios.length > 0) {
          this.users = response.usuarios;
          console.log(this.users);
        } else {
          console.warn('Nenhum usuário encontrado, carregando fallback.');
          this.loadFallbackUsers(); // Para caso da API dar problema
        }
      },
      error: (err: unknown) => {
        console.error('Erro ao buscar usuários da API:', err);
        this.loadFallbackUsers();
      },
    });
  }

  /* Método para carregar usuários padrão caso a API falhe */
  private loadFallbackUsers(): void {
    this.users = [
      {
        id: 1,
        nome: 'Matheus',
        email: 'gueff@gmail.com',
        senha: 'math',
        endereco:{
          cep: '18075718',
          bairro : 'Jardim Brasilândia',
          logradouro : 'Rua Alonco Muchon',
          cidade : 'Sorocaba'
        }
      },
      {
        id: 2,
        nome: 'Davy',
        email: 'davy@gmail.com',
        senha: 'davy',
        endereco:{
          cep: '17571802',
          bairro : 'Jardim Europa',
          logradouro : 'Rua Rock',
          cidade : 'Votorantim'
        }
      },
      {
        id: 3,
        nome: 'Adryann',
        email: 'adryann@gmail.com',
        senha: 'adry',
        endereco:{
          cep: '11111111',
          bairro : 'Bairro tal',
          logradouro : 'Rua tal',
          cidade : 'Sorocaba'
        }
      },
      {
        id: 4,
        nome: 'Ryan',
        email: 'ryan@gmail.com',
        senha: 'ryan',
        endereco:{
          cep: '11111111',
          bairro : 'Bairro tal',
          logradouro : 'Rua tal',
          cidade : 'Sorocaba'
        }
      },
      {
        id: 5,
        nome: 'Pedro',
        email: 'pedro@gmail.com',
        senha: 'pedr',
        endereco:{
          cep: '11111111',
          bairro : 'Bairro tal',
          logradouro : 'Rua tal',
          cidade : 'Sorocaba'
        }
      },
    ];
    console.log('Usando dados de fallback.');
  }


  /* Observable para avisar quando um novo usuário é logado */
  private userAtivoSubject = new BehaviorSubject<IUser | null>(null);
  userAtivo$: Observable<IUser | null> = this.userAtivoSubject.asObservable();

   // Observable para rastrear se o usuário atual é admin
   private adminSubject = new BehaviorSubject<IAdmin | null>(null);
   admin$: Observable<IAdmin | null> = this.adminSubject.asObservable();

  //#region Login e Cadastro

  public fazerLogin(user: IUser) {
    this.sweetAlert.showMessage("Login realizado com sucesso");
    this.userAtivoSubject.next(user);
  }

  public logout() {
    this.userAtivoSubject.next(null);
  }

  /* Criação de um novo usuário */
  public newUser(newUser: IUser) {
    //this.userMockService.addUserToList(newUser); //Método POST
    this.users.push(newUser);
    this.sweetAlert.showMessage("Cadastrado com sucesso");
    console.log(this.users);
  }

  //#endregion

  //#region Validação

  /* Verifica se o usuário com o email e senha passados existe */
  public validateUser(email: string, senha: string): boolean {
    const findUser = this.users.find(
      (user) => user.email === email && user.senha === senha
    );
    if (findUser) {
      this.fazerLogin(findUser);
      return true;
    }
    /* Caso não tenha achado um usuário com email e senha fornecidos */
    return false;
  }

  //* Verifica se já existe um usuário com esse email*/
  public checkEmailExists(newUser: IUser): boolean {
    return this.users.some((user) => user.email === newUser.email);
  }

  //#endregion

  //#region Getters

  /* Pega todos os usuários existentes */
  public getAllUsers(): IUser[] {
    return this.users;
  }

  /* Pega a contagem atual do ID */
  public getCurrentID(): number {
    return this.users.length + 1;
  }

  /* Adquire o IUser atual logado */
  public getCurrentUser(): IUser | null {
    return this.userAtivoSubject.value;
  }

  public getObservableCurrentUser(): Observable<IUser | null>{
    return this.userAtivo$;
  }

  // Procura um usuário de acordo com o ID
  public findUserById(id: number): Observable<IUser> {
    const user = this.users.find((user) => id === user.id);
    if (user) {
      return of(user);
    } else {
      throw new Error('Usuário não encontrado');
    }
  }

  //#endregion

  //#region Verificação de Admin

  private checkIfAdmin(user: IUser): void {
    this.adminService.isAdmin(user.id).subscribe({
      next: (admin: IAdmin | null) => {
        this.adminSubject.next(admin);
      },
      error: (err: any) => {
        console.error('Erro ao verificar se é admin:', err);
        this.adminSubject.next(null); // Em caso de erro, presume-se que não é admin
      },
    });
  }

  //#endregion
}
