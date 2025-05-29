import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { AdminSidebarOptions} from '../../models/enums/AdminSidebarOptions';
import { ModalType } from '../../models/enums/ModalType.enum';
import { TagModalComponent } from '../../Tag/tag-modal/tag-modal.component';
import { ILinkPanelAdmin, ILinkSidebarAdmin } from '../../models/interface/ILink.model';

@Component({
    selector: 'app-menu-admin',
    imports: [RouterLink, TagModalComponent],
    templateUrl: './menu-admin.component.html',
    styleUrl: './menu-admin.component.css'
})
export class MenuAdminComponent {
  constructor(private router: Router) {}

  // ***** Modal *****
  modalTypes = ModalType;

  @ViewChild('botaoModal') botaoModal!: ElementRef;

  tipoModalAtual: ModalType = ModalType.None;

  alternarModal(tipoModal: ModalType) {
    this.tipoModalAtual = tipoModal;
    // Esperar que a variável seja atualizada antes de clicar no botão
    setTimeout(() => {
      this.botaoModal.nativeElement.click();
    });
  }

  private handleNumericNavigation(key: string) {
    //Evita que as teclas de atalho funcionem enquanto o modal está aberto
    if(document.querySelector('.modal')?.classList.contains('show'))return
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
  linksSidebar: ILinkSidebarAdmin[] = [
    {
      name: 'Gerenciar Reclamações',
      img: 'assets/icones/white/reclamacao_icon.svg',
      opcao: AdminSidebarOptions.Reclamacao,
    },
    {
      name: 'Gerenciar notícias do site',
      img: 'assets/icones/white/noticia_icon.svg',
      opcao: AdminSidebarOptions.Noticia,
    },
    {
      name: 'Gerenciar doenças do site',
      img: 'assets/icones/white/doenca_icon.svg',
      opcao: AdminSidebarOptions.Doenca,
    },
    {
      name: 'Gerenciar Tags do site',
      img: 'assets/icones/white/tag_icon.svg',
      opcao: AdminSidebarOptions.Tag,
    },
    {
      name: 'Responsável pelo saneamento',
      img: 'assets/icones/white/responsavel_icon.svg',
      opcao: AdminSidebarOptions.Responsaveis,
    },
    {
      name: 'Log',
      img: 'assets/icones/white/log_icon.svg',
      opcao: AdminSidebarOptions.Log,
    },
  ];

  /* Objeto com todas opções do menu, organizados por tipo de menu e os links dele
   *  AdminSidebarOptions se refere a Opção disponível no sidebar
   *  ILinkPanelAdmin é um array de links que estão ligadas a uma sessão do sidebar
   */
  menuLink: Record<AdminSidebarOptions, ILinkPanelAdmin[]> = {
    [AdminSidebarOptions.Reclamacao]: [
      {
        type: 'link',
        path: '/reclamacao',
        name: 'Seus comentários',
        img: 'assets/icones/operacoes/white/view_icon.svg',
      },
      {
        type: 'link',
        path: '/reclamacao',
        name: 'Adicionar comentário',
        img: 'assets/icones/operacoes/white/add_icon.svg',
      },
      {
        type: 'link',
        path: '/reclamacao',
        name: 'Editar comentário',
        img: 'assets/icones/operacoes/white/edit_icon.svg',
      },
      {
        type: 'link',
        path: '/reclamacao',
        name: 'Remover um comentário',
        img: 'assets/icones/operacoes/white/delete_icon.svg',
      },
      {
        type: 'link',
        path: '/reclamacao',
        name: 'Visualizar todas reclamações',
        img: 'assets/icones/operacoes/white/view_icon.svg',
      },
      {
        type: 'link',
        path: '/reclamacao',
        name: 'Excluir uma reclamação',
        img: 'assets/icones/operacoes/white/delete_icon.svg',
      },
      {
        type: 'link',
        path: '/',
        name: 'Gerar relatório de reclamação',
        img: 'assets/icones/white/log_icon.svg',
      },
      {
        type: 'link',
        path: '/',
        name: 'Visualizar filtragem geográfica',
        img: 'assets/icones/white/geo_icon.svg',
      },
    ],
    [AdminSidebarOptions.Noticia]: [
      {
        type: 'link',
        path: '/noticia-form',
        name: 'Cadastrar uma nova notícia',
        img: 'assets/icones/operacoes/white/add_icon.svg',
      },
      {
        type: 'link',
        path: '/noticia-form',
        name: 'Editar uma notícia',
        img: 'assets/icones/operacoes/white/edit_icon.svg',
      },
      {
        type: 'link',
        path: '/dell-noticia',
        name: 'Excluir uma notícia',
        img: 'assets/icones/operacoes/white/delete_icon.svg',
      },
      {
        type: 'link',
        path: '/noticia-inicial',
        name: 'Visualizar suas notícias criadas',
        img: 'assets/icones/operacoes/white/view_icon.svg',
      },
      {
        type: 'link',
        path: '/noticia-inicial',
        name: 'Visualizar todas notícias',
        img: 'assets/icones/operacoes/white/view_icon.svg',
      },
    ],
    [AdminSidebarOptions.Doenca]: [
      {
        type: 'link',
        path: '/doenca-form',
        name: 'Cadastrar uma nova doença',
        img: 'assets/icones/operacoes/white/add_icon.svg',
      },
      {
        type: 'link',
        path: '/doenca-form',
        name: 'Editar uma doença',
        img: 'assets/icones/operacoes/white/edit_icon.svg',
      },
      {
        type: 'link',
        path: '/doenca-form',
        name: 'Excluir uma doença',
        img: 'assets/icones/operacoes/white/delete_icon.svg',
      },
      {
        type: 'link',
        path: '/doenca-inicial',
        name: 'Visualizar suas doenças cadastradas',
        img: 'assets/icones/operacoes/white/view_icon.svg',
      },
      {
        type: 'link',
        path: '/doenca-inicial',
        name: 'Visualizar todas doenças',
        img: 'assets/icones/operacoes/white/view_icon.svg',
      },
    ],
    [AdminSidebarOptions.Tag] : [
      {
        type: 'link',
        path: '/tag-tabela',
        name: 'Visualizar todas as tags',
        img: 'assets/icones/operacoes/white/view_icon.svg',
      },
      {
        type: 'modal',
        tipoModal: ModalType.Adicao,
        name: 'Criar nova tag',
        img: 'assets/icones/operacoes/white/add_icon.svg',
      },
      {
        type: 'modal',
        tipoModal: ModalType.Edicao,
        name: 'Editar uma tag',
        img: 'assets/icones/operacoes/white/edit_icon.svg',
      },
      {
        type: 'modal',
        tipoModal: ModalType.Exclusao,
        name: 'Excluir uma tag',
        img: 'assets/icones/operacoes/white/delete_icon.svg',
      },
    ],
    [AdminSidebarOptions.Responsaveis]: [
      {
        type: 'link',
        path: '/responsaveis',
        name: 'Visualizar página dos responsáveis pelo saneamento básico',
        img: 'assets/icones/white/responsavel_icon.svg',
      },
    ],
    [AdminSidebarOptions.Log]: [
      {
        type: 'link',
        path: '/',
        name: 'Visualizar log de comentários',
        img: 'assets/icones/white/log_icon.svg',
      },
    ],
    [AdminSidebarOptions.Login]: [],
  };

  //Variável para guardar a opção atual selecionada no sidebar (inicia com o primeiro elemento de linksSidebar)
  sidebarAtual: AdminSidebarOptions = this.linksSidebar[0].opcao;

  //Variável para guardar o array de links referentes a opcao atual do sidebar selecionada
  opcoesMenuAtuais: ILinkPanelAdmin[] =
    this.menuLink[this.sidebarAtual] || [];

  mudarOpcaoAtual(opcao: AdminSidebarOptions) {
    this.sidebarAtual = opcao;
    this.opcoesMenuAtuais = this.menuLink[opcao] || [];
  }
}
