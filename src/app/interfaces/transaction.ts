import { Product } from '../interfaces/product';

export interface TransactionProduct {
    productId: Product;
    quantity: number;
}

export interface Transaction {
    _id?: string;
    seller?: string;
    buyer?: string;
    product: string;
    quantity: number;
    status: string;
    createdAt?: Date; // Optional, added by mongoose with timestamps
    updatedAt?: Date; // Optional, added by mongoose with timestamps
}

export interface TransactionResults {
    count: number;
    next: string;
    previous?: string;
    results: Transaction[]
}