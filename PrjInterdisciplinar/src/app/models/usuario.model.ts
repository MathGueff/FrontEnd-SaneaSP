import { IEndereco } from "./endereco.model";
/*
    Campos com ?. são opcionais, podem não ser informados nos inputs
    Endereco agrupa logradouro, cidade, bairro, numero e cep no mesmo campo
*/

export interface IUser{
    nome: string,
    senha: string,
    email: string,
    telefone?: string,
    cpf?: string,
    endereco?: IEndereco
}
