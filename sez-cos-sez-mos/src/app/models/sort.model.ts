export class Sort {
    constructor(public field: string, public direction = SortDirection.ASC) {
    };

    get asc(): boolean {
        return this.direction === SortDirection.ASC;
    }

    get desc(): boolean {
        return this.direction === SortDirection.DESC;
    }

    public reverse() {
        this.direction = this.asc ? SortDirection.DESC : SortDirection.ASC;
    }
}

export enum SortDirection {
    DESC,
    ASC
}