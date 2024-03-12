export interface Product  {
    id: string;
    name: string;
    description: string;
    image: string;
    user?: string;
    price: number;
}

export interface ProductCreate  {
    name: string;
    description: string;
    image: string;
    user?: string;
    price: number;
}

export interface ProductResults {
    count: number;
    next: string;
    previous?: string;
    results: Product[]
}