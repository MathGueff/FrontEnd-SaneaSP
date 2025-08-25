import { UserService } from '@features/usuario/services/user.service';
import { Comentario } from '../../models/comentario.model';
import { Component, inject, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-comentario-baixo',
    imports: [],
    templateUrl: './comentario-baixo.component.html',
    styleUrl: './comentario-baixo.component.css'
})
export class ComentarioBaixoComponent implements OnInit {
  @Input() comentario!: Comentario;

  userService = inject(UserService);
  autor: string = '';

  ngOnInit(): void {
    if (this.comentario.objUsuario && this.comentario.objUsuario.id){
      if (this.comentario.objAdmin === null) {
        this.userService.getUserById(this.comentario.objUsuario.id).subscribe({
          next: (user) => {
            if (user) {
              this.autor = user.nome;
            }
          },
          error: (error) => {
            console.error('Erro ao buscar usuário:', error);
          },
        });
      } else {
        this.autor = this.comentario.objAdmin;
      }
    }
  }
}
