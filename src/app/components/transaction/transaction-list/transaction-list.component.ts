import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Transaction } from 'src/app/interfaces/transaction';
import { TransactionService } from 'src/app/services/transaction/transaction.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent {
  displayedColumns: string[] = ['buyer', 'seller', 'product', 'quantity', 'status'];
  transactions: Transaction[] = [];

  constructor(private transactionService: TransactionService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.transactionService.getTransactions().subscribe(transactions => {
      this.transactions = transactions;
      console.log(this.transactions)
    });
  }
}
