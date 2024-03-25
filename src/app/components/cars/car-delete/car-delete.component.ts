import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { User } from 'src/app/models/user';
import { CarService } from 'src/app/services/car.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-car-delete',
  templateUrl: './car-delete.component.html',
  styleUrls: ['./car-delete.component.css']
})
export class CarDeleteComponent implements OnInit {

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

  constructor(
    private carService: CarService,
    private userService: UserService,
    private toastService:    ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.car.id = this.route.snapshot.paramMap.get('id')
    this.findById();
  }

  findById() : void{
    this.carService.findById(this.car.id).subscribe(response =>{
      this.car = response;
    })
  }

  delete(): void {
    this.carService.delete(this.car).subscribe(resposta => {
      this.toastService.success('Carro deletado com sucesso', 'Carro deletado');
      this.router.navigate(['cars']);
    }, ex => {
      console.log(ex);
      
      this.toastService.error(ex.error.error);
    })
  }


}
