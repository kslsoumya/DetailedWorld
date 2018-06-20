import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { AppHttpService } from '../../app-http.service';

import { ToastrService } from 'ngx-toastr';
import { Countries } from './countries';


@Component({
  selector: 'app-filtered-view',
  templateUrl: './filtered-view.component.html',
  styleUrls: ['./filtered-view.component.css']
})

export class FilteredViewComponent implements OnInit {

  // Input from regions-view component
  @Input() selectedFilter: string;
  public _option: string;

  public allCountries;
  public heading;
  public isLang = false;
  public isCurr = false;
  public isReg = false;


  constructor(private toastr: ToastrService, private appHttpService: AppHttpService) { }

  ngOnInit() {
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges(changes: SimpleChanges) {
    const option = changes.selectedFilter;
    this._option = option.currentValue;
    this.isLang = this.isCurr = this.isReg = false;
    console.log('In ngOnInit');
    let region;

    // Function to get countries using language
    if (this._option.search('lang') !== -1) {
      let lan = this._option.split('lang_')[1];
      lan = lan.split('?')[0];
      this.heading = this._option.split('=')[1];
      this.isLang = true;
      this.appHttpService.getCountryByLanguage(lan).subscribe(
        (data: Countries[]) => {
          // tslint:disable-next-line:no-unused-expression
          this.allCountries = data;
          console.log(this.allCountries);
          this.flagResize(this.allCountries);
          this.toastr.success(this.heading + ' Language Filter applied');
        },
        (err) => {
          console.log(err.errorMessage);
          this.toastr.error('Some error Occured');
        }
      );

      // Function to get countries using currency

    } else if (this._option.search('cur') !== -1) {
      let cur = this._option.split('cur_')[1];
      cur = cur.split('?')[0];
      this.heading = this._option.split('=')[1];
      this.isCurr = true;
      this.appHttpService.getCountryByCurrency(cur).subscribe(
        (data: Countries[]) => {
          this.allCountries = data;
          console.log(this.allCountries);
          this.flagResize(this.allCountries);
          this.toastr.success(this.heading + 'Currency Filter applied');
        },
        (err) => {
          console.log(err.errorMessage);
          this.toastr.error('Some error Occured');
        }
      );

      // Function to get countries of a region
    } else {
      this.appHttpService.regionCodes.forEach((val) => {
        if (val.code === this._option) {
          region = val.name;
          this.heading = region;
          this.isReg = true;
        }
      });
      this.appHttpService.getRegionDetails(region).subscribe(
        (data: Countries[]) => {
          this.allCountries = data;
          console.log(this.allCountries);
          this.toastr.success('Countries in ' + this.heading + ' opening');
          if (region === 'Asia' || region === 'Europe') {
            this.flagResize(this.allCountries);
          }
        },
        (err) => {
          console.log(err.errorMessage);
          this.toastr.error('Some error Occured');
        });
    }
  }

  //  Function to resize flags of some countries.

  public flagResize = (countries) => {
    countries.forEach((val) => {
      if (val.name === 'Nepal') {
        val.flag = 'assets/npl.svg';
      } else if (val.name === 'Switzerland') {
        val.flag = 'assets/swiss.svg';
      } else if (val.name === 'Holy See') {
        val.flag = 'assets/holy.svg';

      } else if (val.name === 'Belgium') {
        val.flag = 'assets/bel.svg';

      }
    });
  }

}
