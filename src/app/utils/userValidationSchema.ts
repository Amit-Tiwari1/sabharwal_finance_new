import validator from "validator";

export function checkUserValidationError(userData: any): string[] {
    let errors: string[] = [];

    const userValidationSchema = [
        {
            valid: validator.isLength(userData.username, { min: 2 }),
            error: "Username is Invalid",
        },
        {
            valid: validator.isLength(userData.fullName, { min: 1 }),
            error: "Full Name is Invalid",
        },
        {
            valid: validator.isLength(userData.password, { min: 4 }),
            error: "Password is Invalid",
        },
        {
            valid: validator.isMobilePhone(userData.mobilenumber, "any"),
            error: "Mobile number is Invalid",
        },
        {
            valid: validator.isLength(userData.address1, { min: 1, max: 50 }),
            error: "Address is Invalid",
        },
        {
            valid: validator.isLength(userData.city, { min: 1, max: 20 }),
            error: "City is Invalid",
        },
        {
            valid: validator.isLength(userData.state, { min: 1, max: 50 }),
            error: "State is Invalid",
        },
        {
            valid: validator.isEmail(userData.email),
            error: "Email is Invalid",
        },
        {
            valid: validator.isLength(userData.pin, { min: 6, max: 6 }),
            error: "Pin is Invalid",
        },
    ];

    userValidationSchema.forEach((check) => {
        if (!check.valid) {
            errors.push(check.error);
        }
    });

    return errors;
}



export function checkUserLoginValidationError(userData: any) {
    let errors: string[] = [];

    const userLoginValidation = [
        {
            valid: userData.identifier && (validator.isEmail(userData.identifier) || validator.isLength(userData.identifier,{min:1})),
            error: "Email or Username is Invalid",
        },
        {
            valid: userData.password && validator.isLength(userData.password, { min: 4 }),
            error: "Password must be at least 4 characters long",
        },
    ];

    userLoginValidation.forEach((check) => {
        if (!check.valid) {
            errors.push(check.error);
        }
    });

    return errors;
}

