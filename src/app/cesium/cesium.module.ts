import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseModule } from '../base/base.module';
import { SameModule } from '../same/same.module';

import { CesiumRoutingModule } from './cesium-routing.module';
import { VgisComponent } from './vgis/vgis.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BaseModule,
    SameModule,
    
    CesiumRoutingModule
  ],
  declarations: [VgisComponent]
})
export class CesiumModule { }
