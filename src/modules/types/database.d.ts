export interface DbUser {
    id?: number;
    username: string;
    password: string;
    role: "member" | "admin";
}

export interface DbNews {
    id?: number;
    title: string;
    content: string;
    date: number;
    author: string;
    likes: number;
}

export interface DbComment {
    id?: number;
    content: string;
    date: number;
    author: string;
    newsId: number;
}