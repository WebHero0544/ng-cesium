import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoFoundPageComponent } from './components/no-found-page/no-found-page.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NoFoundPageComponent],
  exports: [NoFoundPageComponent]
})
export class BaseModule { }
