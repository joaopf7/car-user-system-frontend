import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

  user: User = {
    id:         '',
    firstName:     '',
    lastName:      '',
    email:    '',
    login:    '',
    password:    '',
    phone:    ''
  }

  firstName: FormControl =  new FormControl(null, Validators.minLength(3));
  lastName: FormControl =  new FormControl(null, Validators.minLength(3));
  email: FormControl =        new FormControl(null, Validators.email);
  login: FormControl =        new FormControl(null, Validators.required);
  password: FormControl = new FormControl(null, Validators.minLength(3));
  phone: FormControl = new FormControl(null, Validators.minLength(3));
  constructor(
    private service: UserService,
    private toast:    ToastrService,
    private router:          Router,
    private route:   ActivatedRoute,
    ) { }

  ngOnInit(): void { 
    this.user.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.service.findById(this.user.id).subscribe(response => {
      this.user = response;
    })
  }


  update(): void {
    this.service.update(this.user).subscribe(() => {
      this.toast.success('Usuário atualizado com sucesso', 'Atualizar');
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
     && this.email.valid && this.password.valid && this.phone.valid
  }


}
