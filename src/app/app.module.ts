import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReviewsRatingsComponent } from './reviews-ratings/reviews-ratings.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LocationBasedInformationComponent } from './location-based-information/location-based-information.component';
import { FirstAidsComponent } from './first-aids/first-aids.component';
import { ProviderInformationComponent } from './provider-information/provider-information.component';
import { HomeComponent } from './home/home.component';

import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    ReviewsRatingsComponent,
    NavBarComponent,
    LocationBasedInformationComponent,
    FirstAidsComponent,
    ProviderInformationComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDNaMwBCibWm1L7IwrST_mx1kLTR81l8gE',
      libraries: ['places']
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
