
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-check-error',
    imports: [],
    templateUrl: './check-error.component.html',
    styleUrl: './check-error.component.css'
})
export class CheckErrorComponent {
  @Input() enum : any; 
  @Input() error : string = ""; 
  @Input() message : string = ""; 

  checkIfFormError(status : string) : boolean{
    /* Recebe o valor do enum (em string) e compara com o estado atual do formulário, se forem iguais, retorna true */
    return this.enum == status
  }
}
