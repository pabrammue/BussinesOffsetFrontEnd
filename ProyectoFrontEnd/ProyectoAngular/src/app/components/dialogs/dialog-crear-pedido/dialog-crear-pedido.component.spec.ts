import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCrearPedidoComponent } from './dialog-crear-pedido.component';

describe('DialogCrearPedidoComponent', () => {
  let component: DialogCrearPedidoComponent;
  let fixture: ComponentFixture<DialogCrearPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogCrearPedidoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCrearPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
