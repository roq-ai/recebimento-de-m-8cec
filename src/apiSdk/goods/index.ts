import axios from 'axios';
import queryString from 'query-string';
import { GoodsInterface, GoodsGetQueryInterface } from 'interfaces/goods';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getGoods = async (query?: GoodsGetQueryInterface): Promise<PaginatedInterface<GoodsInterface>> => {
  const response = await axios.get('/api/goods', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createGoods = async (goods: GoodsInterface) => {
  const response = await axios.post('/api/goods', goods);
  return response.data;
};

export const updateGoodsById = async (id: string, goods: GoodsInterface) => {
  const response = await axios.put(`/api/goods/${id}`, goods);
  return response.data;
};

export const getGoodsById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/goods/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteGoodsById = async (id: string) => {
  const response = await axios.delete(`/api/goods/${id}`);
  return response.data;
};
