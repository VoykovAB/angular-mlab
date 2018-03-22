import {NgModule} from '@angular/core';
import {UsersComponent} from './users.component';
import {routing} from './users.routing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@NgModule({
    imports: [
        routing,
        ReactiveFormsModule,
        FormsModule,
        CommonModule
    ],

    providers: [],

    declarations: [
        UsersComponent
    ]
})
export class UsersModule {

}