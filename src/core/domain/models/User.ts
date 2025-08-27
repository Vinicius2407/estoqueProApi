
export class User {
    id: number;
    name: string;
    email: string;
    password: string;
    telephone: string;
    document: string;
    active: boolean;

    constructor(
        id: number = 0,
        name: string,
        email: string,
        password: string,
        telephone: string,
        document: string,
        active: boolean
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.telephone = telephone;
        this.document = document;
        this.active = active;
    }
}