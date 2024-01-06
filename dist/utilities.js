export function isNumberBetween(value, min, max) {
    return value >= min && value <= max;
}
export function isNumberLessThan(value, limit) {
    return value < limit;
}
export function throwError(errorMessage) {
    throw new Error(errorMessage);
}
