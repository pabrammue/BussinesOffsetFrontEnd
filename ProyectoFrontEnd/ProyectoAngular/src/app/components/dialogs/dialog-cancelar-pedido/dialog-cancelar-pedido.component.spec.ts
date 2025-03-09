import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCancelarPedidoComponent } from './dialog-cancelar-pedido.component';

describe('DialogCancelarPedidoComponent', () => {
  let component: DialogCancelarPedidoComponent;
  let fixture: ComponentFixture<DialogCancelarPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogCancelarPedidoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCancelarPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
