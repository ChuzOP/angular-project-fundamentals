import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
    selector: 'shared-search-box',
    templateUrl: './search-box.component.html',
    styleUrl: './search-box.component.css',
})
export class SearchBoxComponent implements OnInit, OnDestroy {
    private debouncer = new Subject<string>(); // Debouncer

    @Input()
    public placeholder: string = '';

    @Output()
    public onValue = new EventEmitter<string>();

    @Output()
    public onDebounce = new EventEmitter<string>();

    ngOnInit(): void {
        this.debouncer
        .pipe(
            debounceTime(300) //No emitirá nada hasta que no deje de recibir valores despues de n cantidad de tiempo
        )
        .subscribe((value) => {
            this.onDebounce.emit(value)
        });
    }

    ngOnDestroy(): void { // Limpiar una suscripcion o desuscribirse
        this.debouncer.unsubscribe();
    }

    emitValue(value: string) {
        this.onValue.emit(value);
    }

    onKeyPress(searchTerm: string) {
        this.debouncer.next(searchTerm);
    }
}
