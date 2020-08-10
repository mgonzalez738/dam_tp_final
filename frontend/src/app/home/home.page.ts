import { Component, OnInit } from '@angular/core';

import { DispositivoService } from '../services/dispositivo.service';
import {Dispositivo} from '../models/dispositivo.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  listadoDispositivo:Dispositivo[];

  constructor(public dispositivoService:DispositivoService) {
    dispositivoService.getListadoDispositivos().then(lst=>{
      this.listadoDispositivo=lst;
    })
  }

  ngOnInit() {}

}
