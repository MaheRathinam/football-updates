import { Component } from '@angular/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { Country } from '../model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [CommonModule, MatButtonToggleModule],
  templateUrl: './country.component.html',
  styleUrl: './country.component.scss'
})
export class CountryComponent {
  selectedCountry: string = '';

  countryList: Country[] = [
    {
      name: 'England',
      id: 'englandSelect',
      topLeague: 'Premier League',
    },
    {
      name: 'Spain',
      id: 'spainSelect',
      topLeague: 'La Liga',
    },
    {
      name: 'France',
      id: 'franceSelect',
      topLeague: 'Ligue 1',
    },
    {
      name: 'Germany',
      id: 'germanySelect',
      topLeague: 'Bundesliga',
    },
    {
      name: 'Italy',
      id: 'italySelect',
      topLeague: 'Serie A',
    },
  ];

   /**
   * To display standing component for the selected country
   */
   onCountryChange(item: Country) {
    this.selectedCountry = item.name;
   }
}
