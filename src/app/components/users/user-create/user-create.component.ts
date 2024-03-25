import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  user: User = {
    id:         '',
    firstName:     '',
    lastName:      '',
    email:    '',
    birthday: '',
    login:    '',
    password:    '',
    phone:    ''
  }

  firstName: FormControl =  new FormControl(null, Validators.minLength(3));
  lastName: FormControl =  new FormControl(null, Validators.minLength(3));
  birthday: FormControl =       new FormControl(null, Validators.required);
  email: FormControl =        new FormControl(null, Validators.email);
  login: FormControl =        new FormControl(null, Validators.required);
  password: FormControl = new FormControl(null, Validators.minLength(3));
  phone: FormControl = new FormControl(null, Validators.minLength(3));
  constructor(
    private service: UserService,
    private toast:    ToastrService,
    private router:          Router,
    ) { }

  ngOnInit(): void { }

  create(): void {
    this.service.create(this.user).subscribe(() => {
      this.toast.success('Usuário cadastrado com sucesso', 'Cadastro');
      this.router.navigate(['users'])
    }, ex => {
      if(ex.error.errors) {
        ex.error.errors.forEach(element => {
          this.toast.error(element.message);
        });
      } else {
        this.toast.error(ex.error.message);
      }
    })
  }
  
  validaCampos(): boolean {
    return this.firstName.valid && this.lastName.valid
     && this.email.valid && this.birthday.valid && this.password.valid && this.phone.valid
  }

}
