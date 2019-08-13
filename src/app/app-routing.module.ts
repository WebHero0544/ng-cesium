import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoFoundPageComponent } from './base';

const routes: Routes = [
  {
    path: 'vgis',
    loadChildren: './cesium/cesium.module#CesiumModule',
    canActivate: [],
  },
  { path: '', redirectTo: 'vgis', pathMatch: 'full' },
  { path: '**', component: NoFoundPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
