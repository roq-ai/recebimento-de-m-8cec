import { BalanceInterface } from 'interfaces/balance';
import { GoodsInterface } from 'interfaces/goods';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface SupplierInterface {
  id?: string;
  description?: string;
  address?: string;
  contact_number?: string;
  contact_person?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  balance?: BalanceInterface[];
  goods?: GoodsInterface[];
  user?: UserInterface;
  _count?: {
    balance?: number;
    goods?: number;
  };
}

export interface SupplierGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  address?: string;
  contact_number?: string;
  contact_person?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
