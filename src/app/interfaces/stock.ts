export interface Stock {
    product: string;
    quantity: number;
}

export interface StockResults {
    count: number;
    next: string;
    previous?: string;
    results: Stock[]
}