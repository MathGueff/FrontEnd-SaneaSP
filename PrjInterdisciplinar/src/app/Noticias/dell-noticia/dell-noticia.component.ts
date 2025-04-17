import { Component, viewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SweetAlertService } from '../../Services/sweetAlert.service';

@Component({
  selector: 'app-dell-noticia',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dell-noticia.component.html',
  styleUrl: './dell-noticia.component.css'
})

export class DellNoticiaComponent {
  readonly idNoticia = viewChild<any>('idNoticia');
  private sweetAlert = inject(SweetAlertService);


  idEncontrado: boolean = false;
  idPesquisado: number = 0;
  listaNoticias: number[] = [1, 2, 3, 4, 5];

  pesquisarId() {
    this.idPesquisado = Number(this.idNoticia().nativeElement.value);
    if (this.idPesquisado === 0) {
      this.idEncontrado = false;
      return alert('Digite um ID Válido');
    }
    if (!this.listaNoticias.includes(this.idPesquisado)) {
      this.idEncontrado = false;
      return alert('Notícia Não Encontrada');
    }
    this.idEncontrado = this.listaNoticias.includes(this.idPesquisado);
  }

  protected async confirmarExclusao() {
    const confirm = await this.sweetAlert.confirmExclusion(`Deseja mesmo exluir a Noticia: ${this.idPesquisado}?`);
    if (confirm) {
      this.sweetAlert.showMessage("Noticia Excluida com sucesso");
    }
  }
}
