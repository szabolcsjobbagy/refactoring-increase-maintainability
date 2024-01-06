export function processUserData(userIds, userId, isActive, isLoggedIn, waitCounter) {
    let result = "";
    if (isLoggedIn && isActive) {
        let userFound = false;
        for (let i = 0; i < userIds.length; i++) {
            if (userIds[i] === userId) {
                result += "User found: " + userId + " at index " + i;
                userFound = true;
                break;
            }
        }
        if (!userFound) {
            throw new Error("Invalid user ID.");
        }
    }
    else if (!isLoggedIn && isActive) {
        let count = 0;
        while (count < waitCounter) {
            result += "Processing... ";
            count++;
        }
    }
    else {
        result = "No action taken.";
    }
    return result;
}
