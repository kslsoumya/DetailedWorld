import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegionOptions } from './regions';

declare const google: any;


@Component({
  selector: 'app-regions-view',
  templateUrl: './regions-view.component.html',
  styleUrls: ['./regions-view.component.css']
})
export class RegionsViewComponent implements OnInit {
  public countryId;

  constructor(public router: Router) {
    google.charts.load('current', {
      'packages': ['geochart'],
      'mapsApiKey': 'AIzaSyAfhi7NwZpczyWWXhXXpeqnveAMFPrkZls'

    });

  }

  ngOnInit() {
    console.log('NgOninit');
    google.charts.setOnLoadCallback(this.drawRegionsMap);

  }
  public drawRegionsMap = (): any => {
    let selectedItem;
    const data = new google.visualization.arrayToDataTable([
      ['country', 'Name', 'S.No'],
      ['002', 'Africa', 100],
      ['150', 'Europe', 110],
      ['019', 'Americas', 120],
      ['142', 'Asia', 130],
      ['009', 'Oceania', 140]
    ]);
    const options: RegionOptions = {
      region: 'world', resolution: 'continents',
      colorAxis: { colors: ['#bc5a45', '#00ff99', '#ff80ff', '#ffcc33', '#0066cc'] },
      backgroundColor: '#81d4fa',
      datalessRegionColor: '#f8bbd0',
      defaultColor: '#f5f5f5',
      displayMode: 'auto',
      showTooltip: true
    };
    const geoChart = new google.visualization.GeoChart(document.getElementById('regions_div'));
    function selectHandler() {
      selectedItem = geoChart.getSelection()[0];
      if (selectedItem) {
        const topping = data.getValue(selectedItem.row, 0);
        // alert('The user selected ' + topping);
        localStorage.setItem('topping', topping);
      }
    }

    google.visualization.events.addListener(geoChart, 'select', selectHandler);

    geoChart.draw(data, options);

  }

  // Function to fetch the countries list of a region

  public openDetail = () => {
    const id = localStorage.getItem('topping');
    this.router.navigate(['/country/' + id]);
  }

}


