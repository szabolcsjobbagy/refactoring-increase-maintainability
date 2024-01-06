"use strict";
function processUserDataOriginal(x, y, z, a, b, c, d, e) {
    let result = "";
    if (z && c) {
        for (let i = 0; i < a.length; i++) {
            if (a[i] === d) {
                result += "User found: " + d + " at index " + i;
                break;
            }
        }
    }
    else if (!z && c) {
        let count = 0;
        while (count < e) {
            result += "Processing... ";
            count++;
        }
    }
    else {
        result = "No action taken.";
    }
    return result;
}
