import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DispositivoPage } from './dispositivo.page';

const routes: Routes = [
  {
    path: '',
    component: DispositivoPage
  },
  {
    path: 'log-riego',
    loadChildren: () => import('../log-riego/log-riego.module').then( m => m.LogRiegoPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DispositivoPageRoutingModule {}
