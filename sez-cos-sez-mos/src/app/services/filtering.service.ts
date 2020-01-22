import {Observable, Observer, Subject} from "rxjs";
import { debounceTime,
        distinctUntilChanged
    } from 'rxjs/operators';
import {isEmpty as _isEmpty} from "lodash";

export class FilteringService {
    private static DEBOUNCE_TIME = 300;
    private filterObservers = new Map<string, Observer<any>>();
    private allFiltersSource = new Subject<any>();
    private allFiltersObservable = this.allFiltersSource.asObservable();
    public filters = {};

    getAllFiltersObservable(): Observable<any> {
        return this.allFiltersObservable;
    }

    and(operator: Operator, fieldName: string, value?: any, withDebounce?: boolean, delayed: boolean = false) {
        const filterString = FilteringService.filterStringFor(operator, value);
        this.filters[fieldName] = filterString ? "and:" + filterString : undefined;
        if (!delayed) {
            withDebounce = withDebounce === undefined ? FilteringService.isWithDebounce(operator) : withDebounce;
            this.filter(fieldName, withDebounce);
        }
    }

    or(operator: Operator, fieldName: string, value?: any, withDebounce?: boolean) {
        const filterString = FilteringService.filterStringFor(operator, value);
        this.filters[fieldName] = filterString ? "or:" + filterString : undefined;
        withDebounce = withDebounce === undefined ? FilteringService.isWithDebounce(operator) : withDebounce;
        this.filter(fieldName, withDebounce);
    }

    removeFilter(...fields: string[]) {
        fields.forEach(field => this.filters[field] = undefined);
        this.allFiltersSource.next({});
    }

    removeAllFilters() {
        this.filters = {};
        this.allFiltersSource.next({});
    }

    static builder(): FiltersBuilder {
        return new FiltersBuilder();
    }

    static filterStringFor(operator: Operator, value?: any): string {
        switch (operator) {
            case Operator.STARTS_WITH :
                return _isEmpty(value) ? null : "startsWith:" + value;
            case Operator.CONTAINS :
                return _isEmpty(value) ? null : "contains:" + value;
            case Operator.EQUAL :
                return _isEmpty(FilteringService.valueToString(value)) ? null : "equal:" + value;
            case Operator.ARE_MEMBERS :
                return _isEmpty(FilteringService.valueToString(value)) ? null : "areMembers:" + value;
            case Operator.IN :
                return _isEmpty(FilteringService.valueToString(value)) ? null : "in:" + value;
            case Operator.IS_NULL :
                return "isNull:-1";
            case Operator.GREATER :
                return _isEmpty(FilteringService.valueToString(value)) ? null : "gt:" + value;
            case Operator.GREATER_OR_EQUAL :
                return _isEmpty(FilteringService.valueToString(value)) ? null : "ge:" + value;
            case Operator.LESS :
                return _isEmpty(FilteringService.valueToString(value)) ? null : "lt:" + value;
            case Operator.LESS_OR_EQUAL :
                return _isEmpty(FilteringService.valueToString(value)) ? null : "le:" + value;
            default:
                return undefined;
        }
    }

    private static valueToString(value: any): string {
        if (value !== undefined && value !== null) {
            return value.toString();
        } else {
            return value;
        }
    }

    private static isWithDebounce(filter: Operator): boolean {
        switch (filter) {
            case Operator.STARTS_WITH :
            case Operator.CONTAINS :
                return true;
            default:
                return false;
        }
    }

    private filterWithDebounceTimeBy(fieldName: string) {
        if (this.filterObservers.has(fieldName)) {
            this.filterObservers.get(fieldName).next({});
        } else {
            const filterSource = new Subject<any>();
            this.filterObservers.set(fieldName, filterSource);
            filterSource.asObservable()
                .pipe(
                    debounceTime(FilteringService.DEBOUNCE_TIME),
                    distinctUntilChanged()
                )
                .subscribe(() => {
                    this.allFiltersSource.next({});
                });
            filterSource.next({});
        }
    }

    private filter(fieldName: string, withDebounce: boolean) {
        if (withDebounce) {
            this.filterWithDebounceTimeBy(fieldName);
        } else {
            this.allFiltersSource.next({});
        }
    }
}

export class FiltersBuilder {
    private filters: { [key: string]: string } = {};

    or(operator: Operator, fieldName: string, value?: string): FiltersBuilder {
        const filterString = FilteringService.filterStringFor(operator, value);
        this.filters[fieldName] = filterString ? "or:" + filterString : undefined;
        return this;
    }

    and(operator: Operator, fieldName: string, value?: string): FiltersBuilder {
        const filterString = FilteringService.filterStringFor(operator, value);
        this.filters[fieldName] = filterString ? "and:" + filterString : undefined;
        return this;
    }

    build() {
        return this.filters;
    }
}

export enum Operator {
    STARTS_WITH,
    EQUAL,
    CONTAINS,
    ARE_MEMBERS,
    IN,
    IS_NULL,
    GREATER,
    GREATER_OR_EQUAL,
    LESS,
    LESS_OR_EQUAL
}