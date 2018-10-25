import { Routes, RouterModule } from '@angular/router';
import { MemberComponent } from './member.component';

export const routes: Routes = [
    {
        path: '',
        component: MemberComponent,
        children: [
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
        ],
    },

];

export const routing = RouterModule.forChild(routes);