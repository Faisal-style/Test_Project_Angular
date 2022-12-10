import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import Swal from 'sweetalert2';

interface Payload {
  email: string;
  password: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.initFormGroup();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  initFormGroup() {
    return this.fb.group({
      email: ['', [Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  login() {
    const payload: Payload = this.loginForm.value;
    this.authService.loginUser(payload.email, payload.password).subscribe(
      (resp) => {
        console.log(resp);
        if (resp) {
          this.router.navigate(['/menu']);
        }
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Username Atau Password Salah',
        });
      }
    );
  }
}
