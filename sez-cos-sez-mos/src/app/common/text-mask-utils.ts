import {isNil as _isNil} from "lodash";

export class TextMaskUtils {
    static DATE_MASK: Mask = [/\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, "-", /\d/, /\d/];
    static DATE_TIME_MASK: Mask = [/\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, "-", /\d/, /\d/, " ", /\d/, /\d/, ":", /\d/, /\d/];

    static cleanMask(value: string): string {
        if (_isNil(value)) {
            return value;
        }
        return value.replace(/\D+/g, "");
    }
}
