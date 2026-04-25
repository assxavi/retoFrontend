import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionEventosComponent } from './gestion-eventos';

describe('GestionEventos', () => {
  let component: GestionEventosComponent;
  let fixture: ComponentFixture<GestionEventosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionEventosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
