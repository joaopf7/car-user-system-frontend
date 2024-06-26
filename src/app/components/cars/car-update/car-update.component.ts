import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { User } from 'src/app/models/user';
import { CarService } from 'src/app/services/car.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {

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
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.car.id = this.route.snapshot.paramMap.get('id')
    this.findById();
    this.findAllUsers();
  }

  findById() : void{
    this.carService.findById(this.car.id).subscribe(response =>{
      this.car = response;
    })
  }

  update(): void {
    this.carService.update(this.car).subscribe(resposta => {
      this.toastService.success('Carro atualizado com sucesso', 'Carro Atualizado');
      this.router.navigate(['cars']);
    }, ex => {
      console.log(ex);
      
      this.toastService.error(ex.error.error);
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
