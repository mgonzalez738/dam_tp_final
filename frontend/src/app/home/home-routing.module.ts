import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
   {
    path: ':id',
    loadChildren: () => import('../dispositivo/dispositivo.module').then( m => m.DispositivoPageModule)
  },
  {
    path: ':id/logRiego',
    loadChildren: () => import('../log-riego/log-riego.module').then( m => m.LogRiegoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
