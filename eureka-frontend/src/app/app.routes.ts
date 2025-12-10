import { Routes } from '@angular/router';
import { RegistroComponent } from './components/registro/registro';
import { ResultadosComponent } from './components/resultados/resultados';
import { AcercaDeComponent } from './components/acerca-de/acerca-de';

export const routes: Routes = [
  { path: '', redirectTo: '/registro', pathMatch: 'full' },
  { path: 'registro', component: RegistroComponent },
  { path: 'resultados', component: ResultadosComponent },
  { path: 'acerca-de', component: AcercaDeComponent },
  { path: '**', redirectTo: '/registro' }
];
