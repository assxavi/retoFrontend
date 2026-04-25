import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEventoComponent } from './form-evento';
describe('FormEvento', () => {
  let component: FormEventoComponent;
  let fixture: ComponentFixture<FormEventoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormEventoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
