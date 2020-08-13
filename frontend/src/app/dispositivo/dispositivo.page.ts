import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Dispositivo } from '../models/dispositivo.model';
import { DispositivoService } from '../services/dispositivo.service';
import { LogRiego } from '../models/logRiego.model';
import { LogRiegoService } from '../services/logRiego.service';

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

  public dispositivo:Dispositivo;
  public estadoValvula:boolean;
  public dispositivoLoaded:boolean;

  private valorObtenido:number=0;
  public myChart;
  private chartOptions;

  constructor(
    private router:ActivatedRoute, 
    private dispositivoService:DispositivoService,
    private logRiegoService:LogRiegoService
    ) {
       
    setTimeout(()=>{
      console.log("Cambio el valor del sensor");
      this.valorObtenido=60;
      //llamo al update del chart para refrescar y mostrar el nuevo valor
      this.myChart.update({series: [{
          name: 'kPA',
          data: [this.valorObtenido],
          tooltip: {
              valueSuffix: ' kPA'
          }
      }]});
    },6000);
   }

   ionViewWillEnter() {
    let idDispositivo = this.router.snapshot.paramMap.get('id');
    this.dispositivoService.getDispositivo(idDispositivo)
    .then((dsp)=>{
      this.dispositivo = dsp;
      this.dispositivoLoaded = true;
      this.generarChart();
      this.logRiegoService.getLastLogRiegoByElectrovalvulaId(this.dispositivo.electrovalvulaId)
        .then((log)=>{
          if(log.apertura == 1)
            this.estadoValvula = true;
          else
            this.estadoValvula = false;
        })
        .catch((data)=>{
          this.estadoValvula = false;
        })
    })
    .catch(()=>{
      this.dispositivoLoaded = false;
    }); 
  }
/*
  ionViewDidEnter() {
    this.generarChart();
  }*/

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
            to: 10,
            color: '#55BF3B' // green
        }, {
            from: 10,
            to: 30,
            color: '#DDDF0D' // yellow
        }, {
            from: 30,
            to: 100,
            color: '#DF5353' // red
        }]
    }
    ,
  
    series: [{
        name: 'kPA',
        data: [this.valorObtenido],
        tooltip: {
            valueSuffix: ' kPA'
        }
    }]

    };
    this.myChart = Highcharts.chart('highcharts', this.chartOptions );
  }

  public valveOperate(event) {
    if(this.estadoValvula) {
      this.estadoValvula = false
      console.log(`Electrovalvula dispositivo ${this.dispositivo.dispositivoId} cerrada.`);
      this.logRiegoService.postNewLog(this.dispositivo.electrovalvulaId, 0);
    }
    else {
      this.estadoValvula = true
      console.log(`Electrovalvula dispositivo ${this.dispositivo.dispositivoId} abierta.`);
      this.logRiegoService.postNewLog(this.dispositivo.electrovalvulaId, 1);
    }
  }

}
