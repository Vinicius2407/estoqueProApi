export type CreateUserInput = {
    name: string;
    email: string;
    password: string;
    telephone: string;
    document: string;
    active?: boolean;
};

export type CreateUserOutput = {
    id: string;
    name: string;
    email: string;
};
