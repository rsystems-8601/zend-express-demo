const DELAY = 400;

let needShowSpinner = false;
let timer: NodeJS.Timer;
let spinnerIdsToShow = new Set<number | string>();
let mapOfTimers = new Map<number | string, NodeJS.Timer>();

export const Spinner = {
    show: function (id?: number | string) {
        if (id) {
            mapOfTimers.set(id, setTimeout(() => spinnerIdsToShow.add(id), DELAY));
        } else {
            timer && clearTimeout(timer);
            timer = setTimeout(() => needShowSpinner = true, DELAY);
        }
    },
    hide: function (id?: number | string) {
        if (id) {
            clearTimeout(mapOfTimers.get(id));
            mapOfTimers.delete(id);
            spinnerIdsToShow.delete(id);
        } else {
            clearTimeout(timer);
            needShowSpinner = false;
        }
    },
    isShown: function (id?: number | string): boolean {
        return id
            ? spinnerIdsToShow.has(id)
            : needShowSpinner;
    }
};
