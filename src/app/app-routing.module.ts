import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormComponent } from './forms/reactive-form/reactive-form.component';
import { TemplateFormComponent } from './forms/template-form/template-form.component';

const routes: Routes = [
  { path: 'template-form', component: TemplateFormComponent},
  { path: 'reactive-form', component: ReactiveFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
