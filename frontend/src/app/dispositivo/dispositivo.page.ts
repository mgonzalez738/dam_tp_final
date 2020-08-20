import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Dispositivo } from '../models/dispositivo.model';
import { DispositivoService } from '../services/dispositivo.service';
import { LogRiego } from '../models/logRiego.model';
import { LogRiegoService } from '../services/logRiego.service';
import { Medicion } from '../models/medicion.model';
import { MedicionesService } from '../services/mediciones.service';

import * as Highcharts from 'highcharts';
declare var require: any;
require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/solid-gauge')(Highcharts);

@Component({
  selector: 'app-dispositivo',
  templateUrl: './dispositivo.page.html',
  styleUrls: ['./dispositivo.page.scss'],
})
export class DispositivoPage /*implements OnInit*/ {

  public dispositivo: Dispositivo;
  public logRiego: LogRiego;
  public medicion: Medicion;
  public estadoValvula: boolean;
  public dispositivoLoaded: boolean;

  public myChart;
  private chartOptions;
  private intervalObj;
  private valorMedicion: number;

  constructor(
    private router:ActivatedRoute, 
    private dispositivoService:DispositivoService,
    private logRiegoService:LogRiegoService,
    private medicionService:MedicionesService
    ) { }

   async ionViewWillEnter() {
    let idDispositivo = this.router.snapshot.paramMap.get('id');

    try {
      this.dispositivo = <Dispositivo>await this.dispositivoService.getDispositivo(idDispositivo)
      try {
        this.logRiego = <LogRiego> await this.logRiegoService.getLastLogRiegoByElectrovalvulaId(this.dispositivo.electrovalvulaId)
        if(this.logRiego.apertura == 1) {
          this.estadoValvula = true;
        }
        else {
          this.estadoValvula = false;
        }
      }
      catch {
        this.estadoValvula = false;
      }
      try {
        this.medicion = <Medicion> await this.medicionService.getLastMedicionByDispositivoId(this.dispositivo.dispositivoId)
        this.valorMedicion = <number> this.medicion.valor;
        console.log("Ultima medición leida de BD: " + this.medicion.valor);
      }
      catch {
        this.valorMedicion=0;
      }
      this.generarChart()
      this.setChartValue();
      this.dispositivoLoaded = true;
    }
    catch (error)
    {
      this.dispositivoLoaded = false;
      console.log(error);
      return;
    }
  }

  ionViewDidEnter() {
    setTimeout(()=>{ // Muestro el valor de BD durante 5 segundos
      this.intervalObj = setInterval(() => { // Varia el valor del gauge cada 1 segundo segun el estado de la valvula
        if(this.estadoValvula) {
          this.valorMedicion = this.valorMedicion - 1
          if(this.valorMedicion < 0)
          this.valorMedicion = 0;
        }
        else {
          this.valorMedicion = +this.valorMedicion + 2;
          if(this.valorMedicion > 100)
            this.valorMedicion = 100;
        }
        this.setChartValue();
      }, 1000);
    },6000);
    
  }

  ionViewWillLeave() {
    clearInterval(this.intervalObj);
  }

  generarChart() {
    this.chartOptions={
      chart: {
          type: 'gauge',
          plotBackgroundColor: null,
          plotBackgroundImage: null,
          plotBorderWidth: 0,
          plotShadow: false
        }
        ,title: {
          text: ''
        }

        ,credits:{enabled:false}
        
           
        ,pane: {
            startAngle: -150,
            endAngle: 150
        } 
        // the value axis
      ,yAxis: {
        min: 0,
        max: 100,
  
        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 10,
        minorTickPosition: 'inside',
        minorTickColor: '#666',
  
        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        labels: {
            step: 2,
            rotation: 'auto'
        },
        title: {
            text: 'kPA'
        },
        plotBands: [{
            from: 0,
            to: 5,
            color: '#00000' // red 
        }, {
            from: 10,
            to: 15,
            color: '#DF5353' // red 
        }, {
            from: 30,
            to: 40,
            color: '#55BF3B' // green 
        }, {
            from: 50,
            to: 60,
            color: '#DDDF0D' // yellow
        }]
    },
  
    series: [{
        name: 'kPA',
        data: [0],
        tooltip: {
            valueSuffix: ' kPA'
        }
    }]

    };
    this.myChart = Highcharts.chart('highcharts', this.chartOptions );
  }

  setChartValue() {
    var point = this.myChart.series[0].points[0];       
    point.update(this.valorMedicion);
  };

  public valveOperate(event) {
    if(this.estadoValvula) {
      this.estadoValvula = false
      console.log(`Electrovalvula dispositivo ${this.dispositivo.dispositivoId} cerrada.`);
      this.logRiegoService.postNewLog(this.dispositivo.electrovalvulaId, 0);
      console.log(`Nuevo log guardado`);
      this.medicionService.postNuevaMedicion(this.dispositivo.dispositivoId, this.valorMedicion);
      console.log("Nueva medición guardada en BD: " + this.valorMedicion);
    }
    else {
      this.estadoValvula = true
      console.log(`Electrovalvula dispositivo ${this.dispositivo.dispositivoId} abierta.`);
      this.logRiegoService.postNewLog(this.dispositivo.electrovalvulaId, 1);
      console.log(`Nuevo log guardado`);
    }
  }

}
