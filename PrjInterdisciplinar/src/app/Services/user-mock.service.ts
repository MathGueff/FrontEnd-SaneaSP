import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable, catchError, of, timeout } from "rxjs";
import { IUser } from "../models/interface/IUser.model";

@Injectable({ providedIn: "root" })
export class UserMockService {
  private http = inject(HttpClient);
  private apiUrl = `https://apimocha.com/sanea-sp2/users`;

  public getUsersList(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error("Erro ao buscar usuários:", error);
        return of([]); //Retorna a lista vazia
      })
    );
  }

  // public addUserToList(newUser: IUser): Observable<IUser> {
  //   return this.http.post<IUser>(this.apiUrl, newUser).pipe(
  //     catchError((error) => {
  //       console.error("Erro ao adicionar usuário:", error);
  //       return of(newUser);
  //     })
  //   );
  // }
}
