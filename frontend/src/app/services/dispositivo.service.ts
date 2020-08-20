import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Dispositivo } from '../models/dispositivo.model';

@Injectable({
  providedIn: 'root'
})
export class DispositivoService {
  
  private urlApi="http://localhost:3000";
  
  constructor(private _http: HttpClient) { }
 
  getListadoDispositivos():Promise<Dispositivo[]>{
    return this._http.get(this.urlApi + "/api/dispositivos/").toPromise().then((dispositivos:Dispositivo[])=>{
      return dispositivos;
    });
  }

  getDispositivo(id):Promise<Dispositivo>{     
    return this._http.get(this.urlApi+"/api/dispositivos/"+id).toPromise().then((dispositivo:Dispositivo)=>{
      return dispositivo;
    });
  };
}
