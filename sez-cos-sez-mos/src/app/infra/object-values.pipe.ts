import {Pipe, PipeTransform} from "@angular/core";
import * as _ from "lodash";

@Pipe({name: 'values'})
export class ObjectValuesPipe implements PipeTransform {
    transform(value: any) {
        return _.values(value);
    }
}
