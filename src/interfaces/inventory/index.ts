import { GoodsInterface } from 'interfaces/goods';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface InventoryInterface {
  id?: string;
  goods_id: string;
  quantity?: number;
  last_updated?: any;
  updated_by: string;
  status?: string;
  location?: string;
  created_at?: any;
  updated_at?: any;

  goods?: GoodsInterface;
  user?: UserInterface;
  _count?: {};
}

export interface InventoryGetQueryInterface extends GetQueryInterface {
  id?: string;
  goods_id?: string;
  updated_by?: string;
  status?: string;
  location?: string;
}
