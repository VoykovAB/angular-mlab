import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {UsersComponent} from './users.component';

export const routes: Routes = [
    {
        path: '',
        component: UsersComponent,
        children: []
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
