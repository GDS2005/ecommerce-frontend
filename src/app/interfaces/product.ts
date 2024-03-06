export interface Product  {
    name: string;
    description: string;
    imagen: string;
    user: string;
    price: number;
}

export interface ProductResults {
    count: number;
    next: string;
    previous?: string;
    results: Product[]
}