import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {AppRoutesModule} from './app.routes';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {ApiService} from './services/api.service';


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        RouterModule,
        AppRoutesModule,
        HttpClientModule,
    ],
    providers: [ApiService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
