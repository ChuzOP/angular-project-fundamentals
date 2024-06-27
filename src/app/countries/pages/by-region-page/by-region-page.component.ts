import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

type Region = 'Americas' | 'Africa' | 'Asia' | 'Europe' | 'Oceania';

@Component({
    selector: 'app-by-region-page',
    templateUrl: './by-region-page.component.html',
    styles: ``,
})
export class ByRegionPageComponent {
    public countries: Country[] = [];
    public selectedRegion? : Region;

    public regions: Region[] = [
        'Americas',
        'Africa',
        'Asia',
        'Europe',
        'Oceania',
    ];

    constructor(private countriesService: CountriesService) {}

    searchByRegion(region: Region): void {
        this.countriesService
            .searchByRegion(region)
            .subscribe((countries) => (this.countries = countries));

        this.selectedRegion = region;
    }
}
