import { SupplierInterface } from 'interfaces/supplier';
import { GetQueryInterface } from 'interfaces';

export interface BalanceInterface {
  id?: string;
  supplier_id: string;
  total_amount?: number;
  paid_amount?: number;
  due_amount?: number;
  last_payment_date?: any;
  next_payment_date?: any;
  created_at?: any;
  updated_at?: any;

  supplier?: SupplierInterface;
  _count?: {};
}

export interface BalanceGetQueryInterface extends GetQueryInterface {
  id?: string;
  supplier_id?: string;
}
