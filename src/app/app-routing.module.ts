import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'movies', // yonlendirme icin sayfa acildiginda yonlendirilen yer
    pathMatch: 'full', // hic bir sey girmezse kullanici yonlendirsin
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
