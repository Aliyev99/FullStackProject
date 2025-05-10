import { Basket } from "./Basket";

export interface Token{
    refreshToken: string;
    accessToken: string;
}

export interface User{
    username: string;
    email: string;
    country: string;
    basket: Basket;
}






