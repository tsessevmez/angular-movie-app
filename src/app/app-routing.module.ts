import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'movies', // yonlendirme icin sayfa acildiginda yonlendirilen yer
    pathMatch: 'full', // hic bir sey girmezse kullanici yonlendirsin
  },
  {
    path: 'movies',
    loadChildren: () =>
      import('./movies/modules/movie.module').then((m) => m.MoviesModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/modules/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
