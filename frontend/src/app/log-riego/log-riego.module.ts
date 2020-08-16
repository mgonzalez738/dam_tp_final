import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogRiegoPageRoutingModule } from './log-riego-routing.module';

import { LogRiegoPage } from './log-riego.page';
import { ValveStatePipe } from '../pipes/valvestate.pipe';
import { ValveColorDirective } from '../directives/valve-color.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LogRiegoPageRoutingModule
  ],
  declarations: [LogRiegoPage, ValveStatePipe, ValveColorDirective]
})
export class LogRiegoPageModule {}
