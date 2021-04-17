import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Mascota } from 'src/app/models/mascota';
import { Tipomascota } from 'src/app/models/tipomascota';
import { MascotaService } from 'src/app/services/mascota.service';

@Component({
  selector: 'app-registro-mascota',
  templateUrl: './registro-mascota.component.html',
  styleUrls: ['./registro-mascota.component.css']
})
export class RegistroMascotaComponent implements OnInit {

  mascotas: Mascota[] = [];

  mascota: Mascota = new Mascota();

  tipomascota: Tipomascota[] = [];

  titulo: string = 'Agregar Mascota';
 /*** */

  button = document.getElementsByClassName('crud');
  input = document.getElementsByClassName('form-input');
  /***** */
  myform: FormGroup;
  IdMascota: FormControl;
  Nombres: FormControl;
  Raza: FormControl;
  FechaNacimiento: FormControl;
  Sexo: FormControl;
  TipoMascota: FormControl;

  constructor(
    private mascotasService: MascotaService,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.mascotasService.getMascotas().subscribe((data) => (this.mascotas = data));
  }

  submitted: boolean=false;


  createFormControls() {
    this.IdMascota = new FormControl('', [Validators.nullValidator]);
    this.Nombres = new FormControl('', [Validators.required]);
    this.Raza = new FormControl('', [Validators.required]);
    this.FechaNacimiento = new FormControl('', [Validators.required]);
    this.Sexo = new FormControl('', [Validators.required]);
    this.TipoMascota = new FormControl('', [Validators.required]);
  }

  createForm() {
    this.myform = new FormGroup({
      name: new FormGroup({
        IdMascota: this.IdMascota,
        Nombres: this.Nombres,
        FechaNacimiento: this.FechaNacimiento,
        Sexo: this.Sexo,
        Tipomascota: this.TipoMascota,
      }),
    });
  }


  openModalCrud(
    targetModal: Component,
    accion: string,
    idMascota?: number
  ): void {
    this.createFormControls();
    this.createForm();

    this.modalService.open(targetModal, {
      centered: true,
      animation: true,
      backdropClass: 'modal-backdrop',
      size: 'xl',
      keyboard: false,
    });

    if (accion == 'detalle') {
      //this.titulo = "Detalles de Usuario"

      console.log(this.mascota.idmascota);
      this.getMascota(idMascota);
      this.getTipoMascota();
      for (let j = 0; j < this.input.length; j++) {
        this.input[j].setAttribute('disabled', '');
      }
    } else if (accion == 'editar') {
      this.titulo = 'Actualizar Información';
      this.mascota.idmascota = idMascota;
      this.getMascota(idMascota);
      this.getTipoMascota();
      console.log(this.mascota.idmascota);
    } else if (accion == 'agregar') {
      this.getTipoMascota();
      this.mascota.idmascota = 0;
      this.titulo = 'Registro de Mascota';
      //this.modalAgregar();
      //this.myform.clearValidators();
    }
  }


  getMascota(idMascota) {
    this.mascotasService
      .getMascota(idMascota)
      .subscribe((data) => (this.mascota = data));
  }

  getTipoMascota() {
    this.mascotasService
      .getTipoMascota()
      .subscribe((data) => (this.tipomascota = data));
  }

}
