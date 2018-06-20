import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppHttpService } from '../../app-http.service';

@Component({
  selector: 'app-countries-view',
  templateUrl: './countries-view.component.html',
  styleUrls: ['./countries-view.component.css']
})
export class CountriesViewComponent implements OnInit {

  public selectedFilter;
  constructor(private route: ActivatedRoute, private router: Router, private appHttpService: AppHttpService) {
    this.route.params.subscribe(params => {
      console.log('In list-view component');
      this.selectedFilter = this.route.snapshot.paramMap.get('id');
    });
  }

  ngOnInit() {
  }
}
