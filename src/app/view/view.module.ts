import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegionsViewComponent } from './regions-view/regions-view.component';
import { CountriesViewComponent } from './countries-view/countries-view.component';
import { CountriesDetailComponent } from './countries-detail/countries-detail.component';
import { AgmCoreModule } from '@agm/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAfhi7NwZpczyWWXhXXpeqnveAMFPrkZls'
    }),
    RouterModule.forChild([
      { path: 'country/:id', component: CountriesViewComponent },
      { path: 'detail/:name', component: CountriesDetailComponent }
    ])
  ],
  declarations: [RegionsViewComponent, CountriesViewComponent, CountriesDetailComponent]
})
export class ViewModule { }
