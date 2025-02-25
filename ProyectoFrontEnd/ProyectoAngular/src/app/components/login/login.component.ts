import { Component, inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AuthService } from '../../services/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [MatButtonModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  //http = inject(HttpClient)
  authService = inject(AuthService)
  router = inject(Router)

  formulario!: FormGroup
  ngOnInit() {
    this.formulario = new FormGroup({
      email: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required]),
    });
  }

  onSubmit(): void{
    const rawForm = this.formulario.getRawValue();
    this.authService.login(rawForm.email, rawForm.password).subscribe(() => {
      this.router.navigateByUrl('/');
    })
  }
}
