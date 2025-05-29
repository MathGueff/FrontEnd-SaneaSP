import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Noticia } from '../../models/class/noticia';
import { INoticia } from '../../models/interface/INoticias.model';

@Component({
    selector: 'app-noticias-card',
    imports: [RouterLink],
    templateUrl: './noticias-card.component.html',
    styleUrl: './noticias-card.component.css'
})
export class NoticiasCardComponent {
  @Input () cardNoticia !: INoticia;
}
