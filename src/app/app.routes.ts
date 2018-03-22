import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';

const routes: Routes = [
    {
        path: 'users',
        loadChildren: './pages/users/users.module#UsersModule',
    },
    {
        path: '**',
        redirectTo: 'users',
        pathMatch: 'full',
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    providers: [],
    exports: [RouterModule]
})
export class AppRoutesModule {
}