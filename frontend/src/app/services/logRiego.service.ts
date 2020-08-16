import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { LogRiego } from '../models/logRiego.model';

@Injectable({
  providedIn: 'root'
})
export class LogRiegoService {
  
  private urlApi="http://localhost:3000";
  
  constructor(private _http: HttpClient) { }

  getListadoLogRiegoByElectrovalvulaId(id):Promise<LogRiego[]>{
    return this._http.get(this.urlApi + `/api/logRiegos?electrovalvulaId=${id}`).toPromise().then((listingLogRiego:LogRiego[])=>{
      return listingLogRiego;
    });
  }
 
  getLastLogRiegoByElectrovalvulaId(id):Promise<LogRiego>{     
    return this._http.get(this.urlApi+`/api/logRiegos?electrovalvulaId=${id}&limit=1`).toPromise().then((listingLogRiego:LogRiego[])=>{
      return listingLogRiego[0];
    });
  };

  postNewLog(valveId:number, status:number):Promise<Object>{
    const data =  {
       fecha: new Date(Date.now()),
       apertura: status,
       electrovalvulaId: valveId
     };
     return this._http.post(this.urlApi+`/api/logRiegos`, data).toPromise().then((res:Object)=>{
      return res;
    });  
  }  
}
