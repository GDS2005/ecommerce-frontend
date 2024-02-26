export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

export interface UserResults {
    count: number;
    next: string;
    previous?: string;
    results: User[]
}
