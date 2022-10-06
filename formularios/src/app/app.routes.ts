import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveComponent } from './pages/reactive/reactive.component';

const APP_ROUTES: Routes = [
  { path: 'home', component: ReactiveComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' },
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
