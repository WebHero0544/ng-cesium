import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VgisComponent } from './vgis/vgis.component';

const routes: Routes = [
  {
    path: '',
    component: VgisComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CesiumRoutingModule { }
