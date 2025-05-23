import { IEndereco } from '../interface/IEndereco.model';
import { IUser } from './../interface/IUser.model';



export class Reclamacao {
  idReclamacao:number = 0;
  tituloReclamao:string = "";
  descricaoReclamacao:string = "";
  dataReclamacao: string = "" //por enquanto a data vai ser string
  objImagem : string = ""; //por enquanto o objImagem vai ser tipo String
  objTag : string ="" ; // por enquanto objTag vai ser String
  objUsuario !: IUser
  objEndereco ?: IEndereco
}

