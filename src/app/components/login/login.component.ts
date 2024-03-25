import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Credentials } from 'src/app/models/credentials';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  creds: Credentials = {
    login: '',
    password: ''
  }

  login = new FormControl(null, Validators.minLength(3));
  password = new FormControl(null, Validators.minLength(3));

  constructor(
    private toast: ToastrService,
    private service: AuthService,
    private router: Router) { }

  ngOnInit(): void { }

  logar() {
      this.service.authenticate(this.creds).subscribe(response => {
        this.service.successfulLogin(response.headers.get('Authorization').substring(7))
        this.toast.success('Login realizado com sucesso')
        this.router.navigate([''])

      }, () => {
        this.toast.error('invalid login or password')
      })
    
  }

  validaCampos(): boolean {
    return this.login.valid && this.password.valid
  }

}