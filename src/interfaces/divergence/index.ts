import { GoodsInterface } from 'interfaces/goods';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface DivergenceInterface {
  id?: string;
  goods_id: string;
  expected_quantity?: number;
  received_quantity?: number;
  divergence_divergence?: number;
  analysis_date?: any;
  analyst_id: string;
  created_at?: any;
  updated_at?: any;

  goods?: GoodsInterface;
  user?: UserInterface;
  _count?: {};
}

export interface DivergenceGetQueryInterface extends GetQueryInterface {
  id?: string;
  goods_id?: string;
  analyst_id?: string;
}
