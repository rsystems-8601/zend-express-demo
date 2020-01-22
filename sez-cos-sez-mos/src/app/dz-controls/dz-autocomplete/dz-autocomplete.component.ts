import {NgModel, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from "@angular/forms";
import {Component, forwardRef, Input, OnInit} from "@angular/core";
import {Observable} from "rxjs";
import { 
    startWith,
    flatMap,
    map
} from 'rxjs/operators';
import { map as _map,
         keyBy as _keyBy} from "lodash";

@Component({
    selector: "dz-autocomplete",
    templateUrl: "./dz-autocomplete.component.html",
    providers: [{provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DzAutocompleteComponent), multi: true}],
    styles: [`
    ::ng-deep .mat-select-panel { max-height: 440px !important;}
    `]
})
export class DzAutocompleteComponent implements ControlValueAccessor, OnInit {
    onChange = (v) => {
        return;
    };
    onTouched = () => {
        return;
    };

    @Input()
    placeholder: string;
    @Input()
    displayWith: (value: any) => string;
    @Input()
    searchFunction: (value: string) => any[];
    @Input()
    searchPlaceholder: string;
    @Input()
    multiple: boolean;
    @Input()
    enableToClear: boolean;
    @Input()
    required: boolean;

    queryFormControl = new FormControl();
    itemsByString;
    stringItems$: Observable<string[]>;
    stringValue: string | string[];
    availableDisplayItems: string[];
    
    ngOnInit() {
        this.stringItems$ = this.queryFormControl.valueChanges
            .pipe(
                startWith(""),
                flatMap(query => this.searchFunction(query)),
                map(items => {
                    this.itemsByString = _keyBy(items, item => this.displayWith(item));
                    return Object.keys(this.itemsByString);
                })
            );
            this.stringItems$.subscribe((items) => this.availableDisplayItems = items);
    }

    writeValue(value: any) {
        if (value) {
            this.stringValue = Array.isArray(value)
                ? _map(value, val => this.displayWith(val))
                : this.displayWith(value);
        }
    }

    registerOnChange(fn): void {
        this.onChange = (stringValue: string | string[]) => {
            Array.isArray(stringValue)
                ? fn(stringValue.map(stringVal => this.itemsByString[stringVal]))
                : fn(this.itemsByString[stringValue])
        }
    }

    registerOnTouched(fn): void {
        this.onTouched = fn;
    }

    selectAll(select: NgModel) {
        this.stringValue = this.availableDisplayItems;
        select.update.emit(this.availableDisplayItems);
    }

    deselectAll(select: NgModel) {
        select.update.emit([]);
    }
}