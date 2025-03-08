import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MatCardModule, MatCardXlImage} from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { PedidoConDetallesProducto } from '../../Clases/PedidoConDetallesProducto';
import { HttpErrorResponse } from '@angular/common/http';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Proveedor } from '../../Clases/proveedor';
import { ProveedoresService } from '../../services/proveedores/proveedores.service';
import { Categoria } from '../../Clases/categoria';
import { FormsModule } from '@angular/forms';
import { Producto } from '../../Clases/producto';
import { ProductosService } from '../../services/productos/productos.service';
import { DetallesPedidos } from '../../Clases/detalles-pedido';
import { Pedido } from '../../Clases/pedido';
import { PedidosService } from '../../services/pedidos/pedidos.service';
import {MatSelectModule} from '@angular/material/select';
import { MatIconButton } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogCrearPedidoComponent } from '../dialogs/dialog-crear-pedido/dialog-crear-pedido.component';

@Component({
  selector: 'app-crear-pedido',
  imports: [MatCardModule, CommonModule, MatListModule, MatIconModule, FormsModule, MatButton, MatSelectModule, MatIconButton, ReactiveFormsModule],
  templateUrl: './crear-pedido.component.html',
  styleUrl: './crear-pedido.component.scss'
})
export class CrearPedidoComponent implements OnInit{
  nuevoPedido: PedidoConDetallesProducto
  categoriasExisten: boolean = false

  listaProveedores: Proveedor[]
  listaCategoriasProveedor: Categoria[]
  listaProductos: Producto[]
  
  proveedorSeleccionado: Proveedor = {idProveedores: 0, email: '', nombre: '', direccion: ''}
  categoriaSeleccionada: Categoria = {idCategorias: 0, nombre: ''}
  listaProductosSeleccionados: Producto[] = []
  listaDetallesPedido : DetallesPedidos[] = []
  pedidoMandar: PedidoConDetallesProducto

  constructor(private proveedoresService: ProveedoresService, private productosService: ProductosService, 
    private pedidosService: PedidosService, private router: Router, public dialog: MatDialog){}

  /**
   * Método que se encarga de hacer una llamada a la api para obtener la lista de proveedores
   */
  obtenerProveedores(): void{
    this.proveedoresService.getProveedores().subscribe({
      next:(response) =>{ 
        this.listaProveedores = response;
      },
      error: (error: HttpErrorResponse) =>{ 
        if(error.status == 404){
          //TODO hacer algo
        }
        else {
          alert("Ha ocurrido un error al obtener los datos del servidor");   
        }
      },
    });
  }

  /**
   * Método que se encarga de llamar a la api para obtener la lista categorias de un proveedor
   */
  obtenerCategoriasProveedor(): void{
    this.proveedoresService.getCategoriasProveedor(this.proveedorSeleccionado.idProveedores).subscribe({
      next:(response) =>{ 
        this.listaCategoriasProveedor = response;
        this.categoriasExisten = true
      },
      error: (error: HttpErrorResponse) =>{ 
        if(error.status == 404){
          //TODO hacer algo
        }
        else {
          alert("Ha ocurrido un error al obtener los datos del servidor");   
        }
      },
    });
  }

  /**
   * Método que comprueba si para obtener productos se va a buscar por categorias o solo por proveedor
   */
  obtenerProductos():void{
    if (this.categoriaSeleccionada == null || this.categoriaSeleccionada.idCategorias == 0){
      this.obtenerProductosProveedor();
    }
    else{
      this.obtenerProductosProveedorCategoria()
    }
  }

  /**
   * Método que hace una llamada a la api para obtener todos los productos de un proveedor
   */
  obtenerProductosProveedor(){
    this.productosService.getProductosProveedor(this.proveedorSeleccionado.idProveedores).subscribe({
      next:(response) =>{ 
        this.listaProductos = response;
      },
      error: (error: HttpErrorResponse) =>{ 
        if(error.status == 404){
          //TODO hacer algo
        }
        else {
          alert("Ha ocurrido un error al obtener los datos del servidor");   
        }
      },
    });
  }

  /**
   * Método que hace una llamada a la api para obtener todos los productos de un proveedor filtrado por categoría
   */
  obtenerProductosProveedorCategoria(){
    this.productosService.getProductoProveedoresCategoria(this.proveedorSeleccionado.idProveedores, this.categoriaSeleccionada.idCategorias).subscribe({
      next:(response) =>{ 
        this.listaProductos = response;
      },
      error: (error: HttpErrorResponse) =>{ 
        if(error.status == 404){
          //TODO hacer algo
        }
        else {
          alert("Ha ocurrido un error al obtener los datos del servidor");   
        }
      },
    });
  }

  /**
   * Método que añade un detallesPedido (un producto nuevo) a la lista que se enviará
   * Si se pulsa varias veces un mismo producto se aumenta la cantidad del mismo
   * @param producto 
   */
  addProducto(producto):void{
    let nuevoP: DetallesPedidos = {idProducto: producto.idProducto, cantidad: 1, nombreProducto: producto.nombre, 
                                    precioUnidad: producto.precioUnitario, precioTotal: producto.precioUnitario}
    console.log(nuevoP)
    let p = this.obtenerProductoBuscado(producto)

    if (p == null){
      this.listaDetallesPedido.push(nuevoP)
    }
    else{
      p.cantidad++;
      p.precioTotal += p.precioUnidad
    }
  }

  /**
   * Método para aumentar la cantidad de un detallePedido seleccionado
   * @param producto 
   */
  addCantidadProducto(producto): void{
    let p = this.obtenerProductoBuscado(producto)
    p.cantidad++;
    p.precioTotal += p.precioUnidad
  }

  /**
   * Mérotod que reduce la cantidad de un detallePedido seleccionado 
   * Si se llega a 0 se elimina
   * @param producto 
   */
  removeCantidadProducto(producto): void{
    let p = this.obtenerProductoBuscado(producto)
    if (p.cantidad > 0){
      p.cantidad--;
      p.precioTotal -= p.precioUnidad;
      if (p.cantidad == 0){
        this.eliminarProducto(p)
      }
    }
  }

  /**
   * Método que elimina un detallesPedido de la lista final
   * @param producto 
   */
  eliminarProducto(producto): void{
    let p = this.obtenerProductoBuscado(producto)
    this.listaDetallesPedido = this.listaDetallesPedido.filter(p => p !== producto);
  }

  /**
   * Método que devuelve un objeto buscado
   * @param producto 
   * @returns Objeto de DetallesPedido si existe, si no devuelve null
   */
  private obtenerProductoBuscado(producto): DetallesPedidos{
    let p = this.listaDetallesPedido.find(x => x.idProducto === producto.idProducto)
    return p
  }

  /**
   * Método que abre el dialog de confirmacion del pedido
   */
  abrirConfirmarPedido(){
    let pedido: Pedido = {nombreProveedor: this.proveedorSeleccionado.nombre, idProveedor: this.proveedorSeleccionado.idProveedores}
    this.pedidoMandar = {pedido: pedido, listaProductos: this.listaDetallesPedido}

    let dialogRef = this.dialog.open(DialogCrearPedidoComponent, {
      panelClass: 'full-width-dialog',
      height: '800px',
      width: '1000px',
      data: this.pedidoMandar
    });

    dialogRef.afterClosed().subscribe((result) => { //Property 'subscribe' does not exist on type '() => Observable<any>'.
      if (result == true){ 
        this.router.navigate(['pedidos']);
      }
    });
  }

  /**
   * Método que se ejecuta cuando cambia el elemento seleccionado del select de proveedores
   */
  onProveedorChange(): void {
    console.log(this.proveedorSeleccionado)
    if (this.listaDetallesPedido != null || this.listaDetallesPedido.length > 0){
      this.listaDetallesPedido = [];
    }
    this.categoriaSeleccionada = {idCategorias: 0, nombre: ''}
    this.obtenerCategoriasProveedor();
    this.obtenerProductos()
  }

  /**
   * Método que se ejecuta cuando el select de categoría cambia
   */
  onCategoriaChange(): void {
    this.obtenerProductos()
  }

  /**
   * Método que se ejecuta cuando se inicia
   */
  ngOnInit(): void {
    this.obtenerProveedores()
  }
}
