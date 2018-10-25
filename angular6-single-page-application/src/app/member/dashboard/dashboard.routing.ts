import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { QuestionaireComponent } from './questionaire/questionaire.component';

export const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
    },
    { path: 'questionaire/:asmtID', component: QuestionaireComponent },
    // { path: 'questionaire/:id', loadChildren: './questionaire/questionaire.module#QuestionaireModule' }
];

export const routing = RouterModule.forChild(routes);