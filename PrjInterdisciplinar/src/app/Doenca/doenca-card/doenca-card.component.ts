import { Component, Input } from '@angular/core';
import { Doencas } from '../../models/class/doencas';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-doenca-card',
    imports: [RouterLink],
    templateUrl: './doenca-card.component.html',
    styleUrl: './doenca-card.component.css'
})
export class DoencaCardComponent {
  @Input () cardDoenca !: Doencas
}
