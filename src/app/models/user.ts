export class User {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    mobileNumber: string;
    secondaryEmail: string;
    secondaryMobile: string;
    country: string;
    langPref: string;

    constructor(json?: any) {
        if (json != null) {
            this.userId = json.id;
            this.firstName = json.firstName;
            this.lastName = json.lastName;
            this.email = json.email;
            this.mobileNumber = json.mobileNumber;
            this.secondaryEmail = json.secondaryEmail;
            this.secondaryMobile = json.secondaryMobile;
            this.country = json.country;
            this.langPref = json.langPref;
        }
    }

    //Util
    static toArray(jsons: any[]): User[] {
        let users: User[] = [];
        if (jsons) {
            for (let json of jsons) {
                users.push(new User(json));
            }
        }
        return users;
    }
}