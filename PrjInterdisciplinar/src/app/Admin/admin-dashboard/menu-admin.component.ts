import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import {
  MenuAdminDashOpcoesLink,
  MenuAdminSidebarLink,
} from '../../models/class/menu-admin';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { OpcoesSidebarMenuAdmin } from '../../models/enums/OpcoesSidebarMenuAdmin.enum';
import { ModalType } from '../../models/enums/ModalType.enum';
import { TagModalComponent } from '../../Tag/tag-modal/tag-modal.component';

@Component({
  selector: 'app-menu-admin',
  standalone: true,
  imports: [CommonModule, RouterLink, TagModalComponent],
  templateUrl: './menu-admin.component.html',
  styleUrl: './menu-admin.component.css',
})
export class MenuAdminComponent {
  constructor(private router: Router) {}

  // ***** Modal *****
  modalTypes = ModalType;

  @ViewChild('botaoModal') botaoModal!: ElementRef;

  nomeModalAtual: string = '';
  tipoModalAtual: ModalType = ModalType.None;

  alternarModal(nomeModal: string, tipoModal: ModalType) {
    this.nomeModalAtual = nomeModal;
    this.tipoModalAtual = tipoModal;
    // Esperar que a variável seja atualizada antes de clicar no botão
    setTimeout(() => {
      this.botaoModal.nativeElement.click();
    });
  }

  private handleNumericNavigation(key: string) {
    const index = parseInt(key) - 1;
    if (!isNaN(index) && index >= 0 && index < this.linksSidebar.length) {
      this.mudarOpcaoAtual(this.linksSidebar[index].opcao);
      return true;
    }
    return false;
  }

  private handleArrowNavigation(event: KeyboardEvent) {
    //Navegação por setas
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.handleNumericNavigation(event.key)) return;
    this.handleArrowNavigation(event);
  }

  //Array de Objetos de links da sidebar do Menu de Admin
  linksSidebar: MenuAdminSidebarLink[] = [
    {
      nome: 'Gerenciar Reclamações',
      img: 'assets/icones/icon_white_reclamacao.svg',
      opcao: OpcoesSidebarMenuAdmin.Reclamacao,
    },
    {
      nome: 'Gerenciar notícias do site',
      img: 'assets/icones/icon_white_noticia.svg',
      opcao: OpcoesSidebarMenuAdmin.Noticia,
    },
    {
      nome: 'Gerenciar doenças do site',
      img: 'assets/icones/icon_white_doenca.svg',
      opcao: OpcoesSidebarMenuAdmin.Doenca,
    },
    {
      nome: 'Responsável pelo saneamento',
      img: 'assets/icones/icon_white_responsavel.svg',
      opcao: OpcoesSidebarMenuAdmin.Responsaveis,
    },
    {
      nome: 'Log',
      img: 'assets/icones/icon_relatorio_white.svg',
      opcao: OpcoesSidebarMenuAdmin.Log,
    },
  ];

  /* Objeto com todas opções do menu, organizados por tipo de menu e os links dele
   *  OpcoesSidebarMenuAdmin se refere a Opção disponível no sidebar
   *  MeuAdminDashOpcoesLink é um array de links que estão ligadas a um OpcaoMenuAdmin
   */
  menuLink: Record<OpcoesSidebarMenuAdmin, MenuAdminDashOpcoesLink[]> = {
    [OpcoesSidebarMenuAdmin.Reclamacao]: [
      {
        type: 'link',
        path: '/reclamacao',
        nome: 'Visualizar todas reclamações',
        img: 'assets/icones/icon_view_white.svg',
      },
      {
        type: 'link',
        path: '/reclamacao',
        nome: 'Seus comentários',
        img: 'assets/icones/icon_view_white.svg',
      },
      {
        type: 'link',
        path: '/reclamacao',
        nome: 'Excluir uma reclamação',
        img: 'assets/icones/icon_delete_white.svg',
      },
      {
        type: 'link',
        path: '/',
        nome: 'Visualizar todas as tags',
        img: 'assets/icones/icon_view_white.svg',
      },
      {
        type: 'modal',
        nomeModal: 'criarTagReclamacaoModal',
        tipoModal: ModalType.Adicao,
        nome: 'Criar nova tag para os usuários',
        img: 'assets/icones/icon_plus_white.svg',
      },
      {
        type: 'modal',
        nomeModal: 'editarTagReclamacaoModal',
        tipoModal: ModalType.PesquisaEdicao,
        nome: 'Editar uma tag para os usuários',
        img: 'assets/icones/icon_edit_white.svg',
      },
      {
        type: 'modal',
        nomeModal: 'excluirTagReclamacaoModal',
        tipoModal: ModalType.PesquisaExclusao,
        nome: 'Excluir uma tag para os usuários',
        img: 'assets/icones/icon_delete_white.svg',
      },
      {
        type: 'link',
        path: '/',
        nome: 'Gerar relatório de reclamação',
        img: 'assets/icones/icon_relatorio_white.svg',
      },
      {
        type: 'link',
        path: '/',
        nome: 'Visualizar filtragem geográfica',
        img: 'assets/icones/icon_map_white.svg',
      },
    ],
    [OpcoesSidebarMenuAdmin.Noticia]: [
      {
        type: 'link',
        path: '/noticia-form',
        nome: 'Cadastrar uma nova notícia',
        img: 'assets/icones/icon_plus_white.svg',
      },
      {
        type: 'link',
        path: '/noticia-form',
        nome: 'Editar uma notícia',
        img: 'assets/icones/icon_edit_white.svg',
      },
      {
        type: 'link',
        path: '/dell-noticia',
        nome: 'Excluir uma notícia',
        img: 'assets/icones/icon_delete_white.svg',
      },
      {
        type: 'link',
        path: '/noticia-inicial',
        nome: 'Visualizar suas notícias criadas',
        img: 'assets/icones/icon_view_white.svg',
      },
      {
        type: 'link',
        path: '/noticia-inicial',
        nome: 'Visualizar todas notícias',
        img: 'assets/icones/icon_view_white.svg',
      },
    ],
    [OpcoesSidebarMenuAdmin.Doenca]: [
      {
        type: 'link',
        path: '/doenca-form',
        nome: 'Cadastrar uma nova doença',
        img: 'assets/icones/icon_plus_white.svg',
      },
      {
        type: 'link',
        path: '/doenca-form',
        nome: 'Editar uma doença',
        img: 'assets/icones/icon_edit_white.svg',
      },
      {
        type: 'link',
        path: '/doenca-form',
        nome: 'Excluir uma doença',
        img: 'assets/icones/icon_delete_white.svg',
      },
      {
        type: 'link',
        path: '/doenca-inicial',
        nome: 'Visualizar suas doenças cadastradas',
        img: 'assets/icones/icon_view_white.svg',
      },
      {
        type: 'link',
        path: '/doenca-inicial',
        nome: 'Visualizar todas doenças',
        img: 'assets/icones/icon_view_white.svg',
      },
    ],
    [OpcoesSidebarMenuAdmin.Responsaveis]: [
      {
        type: 'link',
        path: '/responsaveis',
        nome: 'Visualizar página dos responsáveis pelo saneamento básico',
        img: 'assets/icones/icon_white_responsavel.svg',
      },
    ],
    [OpcoesSidebarMenuAdmin.Log]: [
      {
        type: 'link',
        path: '/',
        nome: 'Visualizar log de comentários',
        img: 'assets/icones/icon_relatorio_white.svg',
      },
    ],
    [OpcoesSidebarMenuAdmin.Login]: [],
  };

  //Variável para guardar a opção atual selecionada no sidebar (inicia com o primeiro elemento de linksSidebar)
  sidebarAtual: OpcoesSidebarMenuAdmin = this.linksSidebar[0].opcao;

  //Variável para guardar o array de links referentes a opcao atual do sidebar selecionada
  opcoesMenuAtuais: MenuAdminDashOpcoesLink[] =
    this.menuLink[this.sidebarAtual] || [];

  mudarOpcaoAtual(opcao: OpcoesSidebarMenuAdmin) {
    this.sidebarAtual = opcao;
    this.opcoesMenuAtuais = this.menuLink[opcao] || [];
  }
}
