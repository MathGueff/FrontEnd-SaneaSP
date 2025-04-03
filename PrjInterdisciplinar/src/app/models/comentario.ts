import { Reclamacao } from "./reclamacao";
import { IUser } from "./user.model";

export class Comentario {
  id: number = 0;
  descricaoComentario:string = '';
  dataComentario: string = '';
  objAdmin: number = 0; 
  objReclamacao !: Reclamacao;
  objUsuario !: IUser;
}