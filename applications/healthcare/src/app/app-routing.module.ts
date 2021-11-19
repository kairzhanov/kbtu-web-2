import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Главная',
      hasBreadcrumb: true,
      breadCrumbTitle: 'Главная',
      url: '/',
    },
    children: [
      {
        path: 'list',
        loadChildren: () =>
          import('./list/list.module').then((mod) => mod.ListModule),
        data: {
          title: 'Лист',
          hasBreadcrumb: true,
          breadCrumbTitle: 'Лист',
          id: 0,
          url: '/list',
        },
      },
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
