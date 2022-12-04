import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RumahComponent } from './rumah/rumah.component';
import { RumahRoutingModule } from './rumah-routing.module';



@NgModule({
  declarations: [
    RumahComponent
  ],
  imports: [
    CommonModule,
    RumahRoutingModule
  ]
})
export class RumahModule { }
