import { Component, OnInit } from '@angular/core';
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

  constructor(
    private mascotasService: MascotaService,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.mascotasService.getMascotas().subscribe((data) => (this.mascotas = data));
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
