import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'admin', loadChildren: () => import('./@pages/admin/admin.module').then(m => m.AdminModule) },
  { path: 'echo', loadChildren: () => import('./@pages/echo/echo.module').then(m => m.EchoModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
