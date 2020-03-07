import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        children: [
          { path: '', loadChildren: '../tab1/tab1.module#Tab1PageModule' },
          { path: 'add/:listId', loadChildren: '../add/add.module#AddPageModule' }
        ]
      },
      {
        path: 'tab2',
        children: [
          { path: '', loadChildren: '../tab2/tab2.module#Tab2PageModule' },
          { path: 'add/:listId', loadChildren: '../add/add.module#AddPageModule' }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  // {
  //   path: '',
  //   redirectTo: '/tabs/tab1',
  //   pathMatch: 'full'
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
