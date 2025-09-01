import { JwtPayload, sign, verify } from "jsonwebtoken";

import { IJWT } from "@/core/application/ports/out/jwt/IJWT";

export interface IJWTUserpayload {
    sub: string;
}

export class JWTToken implements IJWT {
    hash(payload: string): string {
        const accessToken = sign({ sub: payload }, process.env.JWT_SECRET!, { expiresIn: "3d" });

        return accessToken;
    }

    async compare(token: string): Promise<string | null> {
        try {
            const { sub } = verify(token, process.env.JWT_SECRET!) as JwtPayload;

            return sub ?? null;
        } catch {
            return null;
        }
    }
}
