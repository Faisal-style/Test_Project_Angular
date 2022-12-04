import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RumahComponent } from './rumah/rumah.component';

const routes: Routes = [
  {
    path: '',
    component: RumahComponent,
    runGuardsAndResolvers: 'always',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RumahRoutingModule {}
