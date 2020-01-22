import {Sort} from "./sort.model";

export class PageRequest {
    private static MAX_VALUE = 1000;

    public sort?: string;

    constructor(public size: number, public page: number, sort?: Sort) {
        this.sort = sort && (sort.field + "," + (sort.asc ? "asc" : "desc"));
    }

    static all(sort?: Sort): PageRequest {
        return new PageRequest(PageRequest.MAX_VALUE, 0, sort);
    }

    static limit(limit = PageRequest.MAX_VALUE, sort?: Sort): PageRequest {
        return new PageRequest(limit, 0, sort);
    }
}