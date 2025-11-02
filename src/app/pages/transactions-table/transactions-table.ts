import { Component, inject } from '@angular/core';
import { ITransactionsResponse } from '../../interfaces/transactions-response';
import { TransactionsService } from '../../services/transactions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transactions-table',
  imports: [CommonModule],
  templateUrl: './transactions-table.html',
  styleUrl: './transactions-table.css',
})
export class TransactionsTable {
  private readonly _transactionsService = inject(TransactionsService);

  isLoading: boolean = false;
  transactions: ITransactionsResponse[] = [];
  total_receita: number = 0;
  total_despesa: number = 0;
  saldo: number = 0;
  page = 1;
  limit = 10;

  ngOnInit() {
    this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;
    }, 3000);

    this._transactionsService.getTransactions(this.page, this.limit).subscribe({
      next: (res) => {
        this.transactions = res;

        this.total_despesa = res
          .filter((t) => t.type === 'despesa')
          .reduce((acc, t) => acc + t.amount, 0);

        this.total_receita = res
          .filter((t) => t.type === 'receita')
          .reduce((acc, t) => acc + t.amount, 0);

        this.saldo = this.total_receita - this.total_despesa;
      },
    });
  }

  deleteTransaction(idTransaction: number) {
    this._transactionsService.deleteTransactions(idTransaction).subscribe({
      next: (res) => console.log(res),
    });
  }
}
