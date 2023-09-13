import { DivergenceInterface } from 'interfaces/divergence';
import { InventoryInterface } from 'interfaces/inventory';
import { SupplierInterface } from 'interfaces/supplier';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface GoodsInterface {
  id?: string;
  name: string;
  supplier_id: string;
  quantity?: number;
  received_date?: any;
  receiver_id: string;
  status?: string;
  created_at?: any;
  updated_at?: any;
  divergence?: DivergenceInterface[];
  inventory?: InventoryInterface[];
  supplier?: SupplierInterface;
  user?: UserInterface;
  _count?: {
    divergence?: number;
    inventory?: number;
  };
}

export interface GoodsGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  supplier_id?: string;
  receiver_id?: string;
  status?: string;
}
