import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
    private toast: ToastrService,
    private router: Router) { }

  ngOnInit(): void { }

  logar() {
      this.toast.success('Logou')
      this.router.navigate([''])
    
  }

  validaCampos(): boolean {
    return this.login.valid && this.password.valid
  }

}