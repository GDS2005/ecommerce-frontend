export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
}

export interface UserResults {
    count: number;
    next: string;
    previous?: string;
    results: User[]
}
