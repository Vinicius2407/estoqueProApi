
export interface IJWT {
    hash(payload: string): string;
    compare(token: string): Promise<string | null>;
}