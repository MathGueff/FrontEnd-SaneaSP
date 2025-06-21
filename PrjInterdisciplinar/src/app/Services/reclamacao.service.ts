import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ICreateReclamacao, IReclamacao } from "../models/interface/IReclamacao.interface";
import { AuthService } from "./auth.service";

@Injectable ({providedIn:'root'})
export class ReclamacaoService{

  private urlApi:string = "https://backend-saneasp.onrender.com/reclamacao";

  private authService = inject(AuthService);
  private listReclamcao !: IReclamacao[];
  constructor(private httpClient:HttpClient){}

  public getObservableReclamacao() : Observable<IReclamacao[]> {
    return this.httpClient.get<IReclamacao[]>(`${this.urlApi}/`)
  }

  public getByIdReclamacao(id:number):Observable<IReclamacao>{
     return  this.httpClient.get<IReclamacao>(`${this.urlApi}/${id}`);
  }

  public postReclamacao(reclamacao: ICreateReclamacao):Observable<IReclamacao>{
    const token = this.authService.getAuthToken();
    let headers = new HttpHeaders();
    if(token){
      headers = headers.set('Authorization',token)
    }
   return this.httpClient.post<IReclamacao>(`${this.urlApi}`, reclamacao,{headers})
  }
  public putReclamacao(reclamacao:ICreateReclamacao, idReclamacao: number){
    const token = this.authService.getAuthToken();
    let headers = new HttpHeaders();
    if(token){
      headers = headers.set('Authorization',token)
    }
    return this.httpClient.put<IReclamacao>(`${this.urlApi}/${idReclamacao}`,reclamacao, {headers})
  }
  public deleteReclamacao(idReclamacao:number){
    const token = this.authService.getAuthToken();
    let headers = new HttpHeaders();
    if(token){
      headers = headers.set('Authorization',token)
    }
    return this.httpClient.delete<IReclamacao>(`${this.urlApi}/${idReclamacao}`,{headers})
  }

}
