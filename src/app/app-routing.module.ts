import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


const appRoutes: Routes = [
  { path: '', loadChildren: () => import('./client/client.module').then(m => m.ClientModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
