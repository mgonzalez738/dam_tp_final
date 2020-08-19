import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Medicion } from '../models/medicion.model';

@Injectable({
  providedIn: 'root'
})
export class MedicionesService {

  private urlApi="http://localhost:3000";
  
  constructor(private _http: HttpClient) { }

  getListadoMedicionByDispositivoId(id):Promise<Medicion[]>{
    return this._http.get(this.urlApi + `/api/mediciones?dispositivoId=${id}`).toPromise().then((listingMedicion:Medicion[])=>{
      return listingMedicion;
    });
  }
 
  getLastMedicionByDispositivoId(id):Promise<Medicion>{     
    return this._http.get(this.urlApi+`/api/mediciones?dispositivoId=${id}&limit=1`).toPromise().then((listingMedicion:Medicion[])=>{
      return listingMedicion[0];
    });
  };

  postNuevaMedicion(dispositivoId:number, valor:number):Promise<Object>{
    const data =  {
       fecha: new Date(Date.now()),
       valor: valor,
       dispositivoId: dispositivoId
     };
     return this._http.post(this.urlApi+`/api/mediciones`, data).toPromise().then((res:Object)=>{
      return res;
    });  
  }  

}
