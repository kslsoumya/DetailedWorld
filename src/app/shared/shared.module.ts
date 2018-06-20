import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilteredViewComponent } from './filtered-view/filtered-view.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import { SearchPipe } from './pipe/search-pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([])
  ],
  declarations: [FilteredViewComponent, SearchPipe],
  exports: [FilteredViewComponent, SearchPipe]
})
export class SharedModule { }
