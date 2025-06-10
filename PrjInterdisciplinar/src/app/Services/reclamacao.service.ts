import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Reclamacao } from "../models/class/reclamacao";
import { Observable } from "rxjs";
import { ICreateReclamacao, IReclamacao } from "../models/interface/IReclamacao.interface";
import { AuthService } from "./auth.service";

@Injectable ({providedIn:'root'})
export class ReclamacaoService{
  private urlApi:string = "http://localhost:3000/reclamacao";
  private listReclamcao !: IReclamacao[];
  constructor(private httpClient:HttpClient, private authService: AuthService){}

  public getObservableReclamacao() : Observable<IReclamacao[]> {
    return this.httpClient.get<IReclamacao[]>(`${this.urlApi}/`)
  }

  public getByIdReclamacao(id:number):Observable<IReclamacao>{
     return  this.httpClient.get<IReclamacao>(`${this.urlApi}/${id}`);
  }

  public postReclamacao(reclamcao: ICreateReclamacao):Observable<IReclamacao>{
   return this.httpClient.post<IReclamacao>(`${this.urlApi}`, reclamcao)
  }

  public getByUsuarioReclamacao():Observable<IReclamacao[]>{
    const token = this.authService.getAuthToken();
    console.log(token);
    let headers = new HttpHeaders();
    if(token){
      headers = headers.set('Authorization', token);
      console.log(headers)
    }
    return this.httpClient.get<IReclamacao[]>(`${this.urlApi}/minhas-reclamacooes`,{headers})


  }

}
