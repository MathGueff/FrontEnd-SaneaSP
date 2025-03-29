import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamacaoUsuariosComponent } from './reclamacao-usuarios.component';

describe('ReclamacaoUsuariosComponent', () => {
  let component: ReclamacaoUsuariosComponent;
  let fixture: ComponentFixture<ReclamacaoUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReclamacaoUsuariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReclamacaoUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
