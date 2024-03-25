import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { User } from 'src/app/models/user';
import { CarService } from 'src/app/services/car.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-car-create',
  templateUrl: './car-create.component.html',
  styleUrls: ['./car-create.component.css']
})
export class CarCreateComponent implements OnInit {

  car: Car = {
    id : '',
    year: '',
    licensePlate: '',
    model: '',
    color: '',
    idUser: '',
    nameUser: ''
  }

  users: User[] = []
  

  year: FormControl = new FormControl(null, [Validators.required]);
  licensePlate:     FormControl = new FormControl(null, [Validators.required]);
  model:     FormControl = new FormControl(null, [Validators.required]);
  color:FormControl = new FormControl(null, [Validators.required]);
  idUser:    FormControl = new FormControl(null, [Validators.required]);

  constructor(
    private carService: CarService,
    private userService: UserService,
    private toastService:    ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.findAllUsers();
  }

  create(): void {
    this.carService.create(this.car).subscribe(resposta => {
      this.toastService.success('Carro criado com sucesso', 'Novo Carro');
      this.router.navigate(['cars']);
    }, ex => {
      if(ex.error.errors) {
        ex.error.errors.forEach(element => {
          this.toastService.error(element.message);
        });
      } else {
        this.toastService.error(ex.error.message);
      }
    })
  }

  findAllUsers(): void {
    this.userService.findAll().subscribe(resposta => {
      this.users = resposta;
    })
  }

  validaCampos(): boolean {
    return this.year.valid && this.licensePlate.valid && this.model.valid 
       && this.color.valid && this.idUser.valid
  }

}
