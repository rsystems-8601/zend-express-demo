import {Component, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import {Country} from "./country.model";
import {CountryCode} from "./country-code";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import * as _ from 'google-libphonenumber';

const VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DzPhoneInputComponent),
    multi: true
};

@Component({
    selector: 'dz-phone-input',
    templateUrl: './dz-phone-input.component.html',
    providers: [VALUE_ACCESSOR]
})
export class DzPhoneInputComponent implements ControlValueAccessor {


    onChange = (value: string) => {
        return;
    };
    onTouched = () => {
        return;
    };

    @Output() onInput: EventEmitter<string> = new EventEmitter<string>();
    @Input()
    placeholder = 'mobilePhoneNumber';

    @Input() 
    disabledArr: any;

    value = '';
    private preferredCountries = ['us', 'ru', 'de', 'nl', 'pt'];
    // private constantMaskPart = [" ", "(", /\d/, /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/];
    private constantMaskPart = [ /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, "-",  /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/];
    private phoneNumberUtil = _.PhoneNumberUtil.getInstance();
    private maskPlaceholderChar = "\u2000";

    allCountries = CountryCode.COUNTRIES.map(c => {
        return {
            name: c[0].toString(),
            iso2: c[1].toString(),
            dialCode: c[2].toString(),
            priority: +c[3] || 0,
            areaCode: +c[4] || null,
            flagClass: c[1].toString().toLocaleLowerCase()
        };
    });

    preferredCountriesInDropDown: Country[];
    selectedCountry: Country;
    maskOptions = {
        mask: ["+",  ...this.constantMaskPart],
        showMask: false,
        placeholderChar: this.maskPlaceholderChar,
        guide: false
    };

    writeValue(value: string): void {
        if (value) {
            try {
                let phoneNumber = this.phoneNumberUtil.parse(value);
                let countryCodeMask = phoneNumber.getCountryCode().toString().split("");
                this.maskOptions = {...this.maskOptions, mask: ["+",  ...this.constantMaskPart]};
                this.value = value;
                this.selectedCountry = this.allCountries.filter((country) => {
                    return country.dialCode == phoneNumber.getCountryCode().toString() && country.priority == 0;
                })[0];
            } catch (error) {
                this.value = value;
            }
        }
    }

    registerOnChange(fn: any): void {
        this.onChange = value => {
            let v = value.replace(new RegExp(this.maskPlaceholderChar, "g"), "");
            try {
                this.phoneNumberUtil.parse(value);
            } catch (error) {
                v = "";
            }
            this.onInput.emit(v);
            fn(v);
        };
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    constructor() {
        this.preferredCountriesInDropDown = this.preferredCountries.map(iso2 => {
            return this.allCountries.filter((c) => {
                return c.iso2 === iso2;
            })[0];
        });

        this.selectedCountry = this.preferredCountriesInDropDown[0];
    }

    showMask() {
        this.maskOptions = {...this.maskOptions, showMask: true};
        console.log(this.disabledArr);
    }

    hideMask() {
        this.maskOptions = {...this.maskOptions, showMask: false};
    }

    onCountrySelect(country: Country, el): void {
        this.value = "";
        let countryCodeMask = country.dialCode.split("");
        this.maskOptions = {...this.maskOptions, mask: ["+",  ...this.constantMaskPart]};
        this.selectedCountry = country;
        el.focus();
    }
}