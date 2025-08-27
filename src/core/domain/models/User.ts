
export class User {
    id: number;
    name: string;
    email: string;
    password: string;
    telephone: string;
    document: string;
    active: boolean;

    constructor(
        name: string,
        email: string,
        password: string,
        telephone: string,
        document: string,
        active: boolean,
        id?: number,
    ) {
        this.id = id ?? 0;
        this.name = name;
        this.email = email;
        this.password = password;
        this.telephone = telephone;
        this.document = document;
        this.active = active;
    }
}