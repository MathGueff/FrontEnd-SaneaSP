import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Doencas } from '../../models/class/doencas';
import { DoencaCardComponent } from '../doenca-card/doenca-card.component';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { NotFoundComponent } from '../../Common/not-found/not-found.component';
import { DoencaService } from '../../Services/doenca.service';

@Component({
  selector: 'app-doencas-inicial',
  standalone: true,
  imports: [
    CommonModule,
    DoencaCardComponent,
    ReactiveFormsModule,
    NotFoundComponent,
  ],
  templateUrl: './doencas-inicial.component.html',
  styleUrl: './doencas-inicial.component.css',
})
export class DoencasInicialComponent implements OnInit {
  private doencaService = inject(DoencaService)
  //variaveis para poder controlar o componente NotFound
  protected vazio: boolean = true;
  erro: string = "doenças";
  //Observable Doenças
  private doencaSubject = new BehaviorSubject<Doencas[]>([] as any);
  data$: Observable<Doencas[]> = this.doencaSubject.asObservable();
  TagSelect: FormGroup;
  doencas: Doencas[] = [
    {
      id: 1,
      title: 'Amebíase',
      description:
        'A amebíase é mais comum em regiões onde as condições de saneamento básico são precárias, uma vez que a forma de contaminação se dá via ingestão de seus cistos',
      image: 'img/paginas/doencas/amebiase.jpg',
    },
    {
      id: 2,
      title: 'Cólera',
      description:
        'De acordo com relatos bem antigos, a cólera estava presente desde os primeiros séculos da humanidade, causando diarreias agudas de aspecto semelhante à água de arroz, vômitos e, em casos mais acentuados, câimbras, perda de peso intensa e olhos turvos',
      image: 'img/paginas/doencas/colera.webp',
    },
    {
      id: 3,
      title: 'Esquistossomose',
      description:
        'Esquistossomose é uma doença parasitária causada por um platelminto. A doença é também conhecida como doença do caramujo, xistose e barriga d’água.',
      image: 'img/paginas/doencas/esquistossomose.jpg',
    },
    {
      id: 4,
      title: 'Leptospirose',
      description:
        'Leptospirose é uma doença transmitida principalmente pela urina de animais infectados, como roedores, e pode ser contraída pelo contato com água ou com solo contaminados.',
      image: 'img/paginas/doencas/leptospirose.webp',
    },
    {
      id: 5,
      title: 'Ascaridíase',
      description:
        'A ascaridíase é o resultado da infestação do helminto Ascaris lumbricoides no organismo, sendo mais frequentemente encontrado no intestino',
      image: 'img/paginas/doencas/ascaridiase.webp',
    },
  ];

  constructor(private fb: FormBuilder) {
    this.doencaSubject.next(this.doencas);
    this.TagSelect = this.fb.group({
      tagForm: ['Todos'],
    });
  }

  ngOnInit(): void {
    /*
    this.TagSelect.valueChanges.subscribe(() => {
      let lista: Doencas[] = [];
      //Verifica se nenhuma Tag foi selecionada
      if (this.TagSelect.value.tagForm === 'Todas') {
        lista = this.doencas;
      }
      // Filtra o array de Reclamações pela tag selecionada
      else {
        lista = this.doencas.filter((doencas) => {
          return doencas.tags === this.TagSelect.value.tagForm;
        });
      }
      //atualizando o valor do Observabale
      this.doencaSubject.next(lista);
    });
    */
    //verifica se lista de doenças é vazia
    if(this.doencas.length > 0){
      this.vazio = false;
    }
    else{
      this.vazio = true;
    }
  }
}
