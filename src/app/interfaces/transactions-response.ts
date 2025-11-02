export interface ITransactionsResponse {
  id: number;
  description: string;
  amount: number;
  type: string;
  date: string;
  user_id: number;
  category_name: string;
  category_id: number;
}
