import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Dispositivo } from '../models/dispositivo.model';
import { DispositivoService } from '../services/dispositivo.service';
import { Medicion } from '../models/medicion.model';
import { MedicionesService } from '../services/mediciones.service';

@Component({
  selector: 'app-medicion',
  templateUrl: './medicion.page.html',
  styleUrls: ['./medicion.page.scss'],
})
export class MedicionPage implements OnInit {

  public dispositivo: Dispositivo;
  public mediciones: Medicion[];

  constructor (
    private router:ActivatedRoute,
    public medicionService: MedicionesService,
    public dispositivoService: DispositivoService) 
  { }

  async ngOnInit() {
    let idDispositivo = this.router.snapshot.paramMap.get('id');    
    try {
      this.dispositivo = <Dispositivo>await this.GetDispositivoById(idDispositivo);
      console.log(this.dispositivo);
      this.mediciones = <Medicion[]>await this.GetMedicionesByDispositivoId(this.dispositivo.dispositivoId);
     }
    catch(error) {
      console.log(error);
    }   
  };

  async GetDispositivoById(id)
  {
    try {
      return await this.dispositivoService.getDispositivo(id);
    }
    catch (error) {
      throw error;
    }
  }

  async GetMedicionesByDispositivoId(id)
  {
    try {
      return await this.medicionService.getListadoMedicionByDispositivoId(id);
    }
    catch (error) {
      throw error;
    }
  }
  

}
