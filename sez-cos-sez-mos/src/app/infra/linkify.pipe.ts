import {Pipe, PipeTransform} from "@angular/core";
import * as linkify from "linkifyjs/html";

@Pipe({name: 'linkify'})
export class LinkifyPipe implements PipeTransform {

    transform(value) {
        return linkify(value);
    }
}
