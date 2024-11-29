import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuUsuario } from '../../models/menu-usuario';
import { RouterLink} from '@angular/router';

@Component({
  selector: 'app-menu-usuario',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './menu-usuario.component.html',
  styleUrl: './menu-usuario.component.css'
})
export class MenuUsuarioComponent{
  //Array com os links do menu
  cards : MenuUsuario[] = [
    {path: '/doenca-inicial', nome : 'Doenças', titulo : 'Doenças relacionadas', src : 'assets/icones/icon_black_doenca.svg', info : 'Veja informações sobre as doenças que estão relacionadas a falta de saneamento básico'},
    {path: '/noticia-inicial', nome : 'Notícias', titulo : 'Notícias sobre saneamento básico', src : 'assets/icones/icon_black_noticia.svg', info : 'Confira algumas das principais notícias sobre saneamento básico e a distribuição de água potável.'},
    {path: '/reclamacao', nome : 'Reclamações', titulo : 'Faça uma reclamação', src : 'assets/icones/icon_black_reclamacao.svg', info : 'Clique aqui para registrar sua reclamação e ajudar a melhorar a qualidade do abastecimento de água, coleta de esgoto e outros serviços essenciais em sua comunidade!'},
    {path: '/responsaveis', nome : 'Responsáveis', titulo : 'Responsáveis pelo saneamento básico', src : 'assets/icones/icon_black_responsavel.svg', info : 'Identifique os principais responsáveis pelo saneamento básico e descubra como você pode contribuir para melhorar o saneamento em sua cidade.'}
  ];
}
