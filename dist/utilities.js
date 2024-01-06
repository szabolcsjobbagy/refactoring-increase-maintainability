export function isEmptyText(value) {
    return value.trim() == "";
}
export function isMissing(value) {
    return value == null || value == undefined || Number.isNaN(value);
}
export function isNumeric(value) {
    return typeof value == "number";
}
export function isNumberBetween(value, min, max) {
    return value >= min && value <= max;
}
export function isNumberLessThan(value, limit) {
    return value < limit;
}
export function throwError(errorMessage) {
    throw new Error(errorMessage);
}
