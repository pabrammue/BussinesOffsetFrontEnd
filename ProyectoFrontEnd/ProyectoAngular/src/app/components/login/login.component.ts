import { Component, inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AuthService } from '../../services/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [MatButtonModule, MatFormFieldModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  //http = inject(HttpClient)
  authService = inject(AuthService)
  router = inject(Router)
  mensajeError = ''

  formulario!: FormGroup
  ngOnInit() {
    this.formulario = new FormGroup({
      email: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required]),
    });
  }

  /**
   * Método que intentará iniciar sesión
   */
  onSubmit(): void{
    const rawForm = this.formulario.getRawValue();
    this.authService.login(rawForm.email, rawForm.password).subscribe({
      next: () => {
        this.router.navigateByUrl('/');
      },
      error: () => {
        this.mensajeError = 'Correo o contraseña incorrectos';
      }
    })
  }
}
