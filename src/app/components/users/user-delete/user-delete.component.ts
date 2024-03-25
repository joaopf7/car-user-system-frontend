import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.css']
})
export class UserDeleteComponent implements OnInit {

  user: User = {
    id:         '',
    firstName:     '',
    lastName:      '',
    email:    '',
    login:    '',
    password:    '',
    phone:    ''
  }

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


  delete(): void {
    this.service.delete(this.user.id).subscribe(() => {
      this.toast.success('Usuário deletado com sucesso', 'Delete');
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
  
}
