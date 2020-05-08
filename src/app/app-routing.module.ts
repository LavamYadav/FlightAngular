import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlightListComponent } from './flight-list/flight-list.component';
import { AddFlightComponent } from './add-flight/add-flight.component';

const routes: Routes = [
  { path: '', redirectTo: 'view-flight', pathMatch: 'full' },
  { path: 'view-flight', component: FlightListComponent },
  { path: 'add-flight', component: AddFlightComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
