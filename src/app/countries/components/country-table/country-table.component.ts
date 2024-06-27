import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Country } from '../../interfaces/country';

@Component({
    selector: 'countries-table',
    templateUrl: './country-table.component.html',
    styles: [`
        img{
            width: 35px
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryTableComponent {
    @Input()
    public countries: Country[] = [];
}
