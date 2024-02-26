import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './paginas/dashboard.component';

export const routes: Routes = [

    {
        path: 'dashboard', 
        component: DashboardComponent, 
        loadChildren: () => import('./router-child.modules').then(m => m.RouterChildModule)
    },

]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DashboardRoutingdModule { }
