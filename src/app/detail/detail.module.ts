import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail/detail.component';
import { DetailRoutingModule } from './detail-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
@NgModule({
  declarations: [DetailComponent],
  imports: [
    CommonModule,
    DetailRoutingModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
  ],
})
export class DetailModule {}
