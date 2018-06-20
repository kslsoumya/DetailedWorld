import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppHttpService } from '../../app-http.service';

import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-countries-detail',
  templateUrl: './countries-detail.component.html',
  styleUrls: ['./countries-detail.component.css']
})
export class CountriesDetailComponent implements OnInit {
  public countryDetails;
  public translationKeys = ['br', 'de', 'es', 'fa', 'fr', 'hr', 'it', 'ja', 'nl', 'pt'];

  constructor(private route: ActivatedRoute, private appHttpService: AppHttpService, private toastr: ToastrService) { }

  ngOnInit() {

    //  Funtcion to get country details.

    const name = this.route.snapshot.paramMap.get('name');
    this.appHttpService.getCountryDetails(name).subscribe(
      (data) => {
        this.countryDetails = data[0];
        this.toastr.success(name + ' Details fetching...');
      },
      (error) => {
        console.log(error.errorMessage);
        this.toastr.error('Some error Occured');
      });
  }
}
