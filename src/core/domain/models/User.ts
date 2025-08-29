export class User {
    id: number;
    name: string = "";
    email: string = "";
    password: string = "";
    telephone: string = "";
    document: string = "";
    active?: boolean;

    constructor(props: Omit<User, "id">, id?: number) {
        Object.assign(this, props);
        this.id = id ?? 0;
    }
}
