import { Component, Input } from '@angular/core';
import { Reclamacao } from '@features/reclamacao/models/reclamacao.model';

@Component({
    selector: 'app-comentario-cima',
    imports: [],
    templateUrl: './comentario-cima.component.html',
    styleUrl: './comentario-cima.component.css'
})
export class ComentarioCimaComponent {
  @Input() reclamacao !: Reclamacao
}
