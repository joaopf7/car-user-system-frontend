import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Credentials } from 'src/app/models/credentials';


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
    private router: Router) { }

  ngOnInit(): void { }

  logar() {
    
      this.router.navigate([''])
    
  }

  validaCampos(): boolean {
    return this.login.valid && this.password.valid
  }

}