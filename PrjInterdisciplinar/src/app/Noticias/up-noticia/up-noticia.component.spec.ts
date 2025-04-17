import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpNoticiaComponent } from './up-noticia.component';

describe('UpNoticiaComponent', () => {
  let component: UpNoticiaComponent;
  let fixture: ComponentFixture<UpNoticiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpNoticiaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpNoticiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
