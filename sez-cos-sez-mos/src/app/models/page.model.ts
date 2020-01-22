export class Page<T> {

    constructor(public content: Array<T>, public totalElements: number) {
    }

    static empty() {
        return new Page([], 0);
    }
}

export class Pagenew<T>{

    constructor(public data: Array<T>, public totalResult: number, public size:number) {
    }

    static empty() {
        return new Pagenew([], 0, 0);
    }
    
}