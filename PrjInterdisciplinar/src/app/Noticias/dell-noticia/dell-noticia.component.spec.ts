import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DellNoticiaComponent } from './dell-noticia.component';

describe('DellNoticiaComponent', () => {
  let component: DellNoticiaComponent;
  let fixture: ComponentFixture<DellNoticiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DellNoticiaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DellNoticiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
