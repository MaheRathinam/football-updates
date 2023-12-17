import { Routes } from '@angular/router';
import { CountryComponent } from './country/country.component';
import { FixturesComponent } from './fixtures/fixtures.component';

export const routes: Routes = [
  { path: '', component: CountryComponent },
  { path: 'country', component: CountryComponent },
  { path: 'fixture', component: FixturesComponent },
];
