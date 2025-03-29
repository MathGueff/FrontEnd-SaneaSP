import { IUser } from "./user.model";

export class Reclamacao {
  idReclamacao:number = 0;
  tituloReclamao:string = "";
  descricaoReclamacao:string = "";
  dataReclamacao: string = "" //por enquanto a data vai ser string
  objImagem : string = ""; //por enquanto o objImagem vai ser tipo String
  objTag : string ="" ; // por enquanto objTag vai ser String
  objUsuario !: IUser
}

