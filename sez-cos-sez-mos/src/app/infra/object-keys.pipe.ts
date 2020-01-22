import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'keys'})
export class ObjectKeysPipe implements PipeTransform {
    transform(value: any) {
        return value && Object.keys(value);
    }
}
