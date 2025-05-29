import { Component, Input } from '@angular/core';
import { Reclamacao } from '../../models/class/reclamacao';

@Component({
    selector: 'app-comentario-cima',
    imports: [],
    templateUrl: './comentario-cima.component.html',
    styleUrl: './comentario-cima.component.css'
})
export class ComentarioCimaComponent {
  @Input() reclamacao !: Reclamacao
}
