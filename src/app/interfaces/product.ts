export interface Product  {
    id: string;
    _id: string;
    name: string;
    description: string;
    image: string;
    user?: string;
    price: number;
    stock: number;
}

export interface ProductCreate  {
    name: string;
    description: string;
    image: string;
    user?: string;
    price: number;
    stock: number;
}

export interface ProductResults {
    count: number;
    next: string;
    previous?: string;
    results: Product[]
}