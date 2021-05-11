export class Customer {
    firstName: string;
    lastName: string;
    email: string;
    street: string;
    streetNumber: string;
    zipCode: string;
    countryCode: string;
    phoneNumber: string;
    notifyMedium: NotifyMedium;
    keepNotified: boolean;
}

export enum NotifyMedium {
    PHONE,
    EMAIL
}