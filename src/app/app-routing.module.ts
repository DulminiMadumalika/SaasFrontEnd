import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReviewsRatingsComponent } from './reviews-ratings/reviews-ratings.component';
import { LocationBasedInformationComponent } from './location-based-information/location-based-information.component';
import { FirstAidsComponent } from './first-aids/first-aids.component';
import { ProviderInformationComponent } from './provider-information/provider-information.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    {path: 'directory', component: ProviderInformationComponent},
    {path: 'reviews', component: ReviewsRatingsComponent},
    {path: 'location-based-search', component: LocationBasedInformationComponent},
    {path: 'first-aid', component: FirstAidsComponent },
    {path: 'home', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
