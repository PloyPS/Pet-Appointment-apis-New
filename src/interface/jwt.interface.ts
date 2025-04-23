export interface JwtPayload  {
    userId: string;
    username: string;
    password: string;
    phone?: string; 
}

export interface Token {
    token: string;
}