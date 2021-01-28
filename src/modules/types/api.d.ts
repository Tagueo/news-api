import { Request } from 'express';

export interface ApiRequest extends Request {
    decoded?: {
        id: number;
        username: string;
        role: "member" | "admin";
    };
}

export interface NewsSummary {
    id: number,
    title: string;
    author: string;
    date: number;
}