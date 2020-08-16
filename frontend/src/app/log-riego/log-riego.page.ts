import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';

import { Dispositivo } from '../models/dispositivo.model';
import { DispositivoService } from '../services/dispositivo.service';
import { LogRiego } from '../models/logRiego.model';
import { LogRiegoService } from '../services/logRiego.service';

@Component({
  selector: 'app-log-riego',
  templateUrl: './log-riego.page.html',
  styleUrls: ['./log-riego.page.scss'],
})
export class LogRiegoPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  public dispositivo: Dispositivo;
  public logsRiego: LogRiego[];

  constructor(
    private router:ActivatedRoute,
    public logRiegoService:LogRiegoService,
    public dispositivoService: DispositivoService
  ) { }

  async ngOnInit() {
    let idDispositivo = this.router.snapshot.paramMap.get('id');    
    try {
      this.dispositivo = <Dispositivo>await this.GetDispositivoById(idDispositivo);
      console.log(this.dispositivo);
      this.logsRiego = <LogRiego[]>await this.GetLogsRiegoByElectrovalvulaId(this.dispositivo.electrovalvulaId);
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

  async GetLogsRiegoByElectrovalvulaId(id)
  {
    try {
      return await this.logRiegoService.getListadoLogRiegoByElectrovalvulaId(id);
    }
    catch (error) {
      throw error;
    }
  }

}
