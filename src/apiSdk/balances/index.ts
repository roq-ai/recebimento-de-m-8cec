import axios from 'axios';
import queryString from 'query-string';
import { BalanceInterface, BalanceGetQueryInterface } from 'interfaces/balance';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getBalances = async (query?: BalanceGetQueryInterface): Promise<PaginatedInterface<BalanceInterface>> => {
  const response = await axios.get('/api/balances', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createBalance = async (balance: BalanceInterface) => {
  const response = await axios.post('/api/balances', balance);
  return response.data;
};

export const updateBalanceById = async (id: string, balance: BalanceInterface) => {
  const response = await axios.put(`/api/balances/${id}`, balance);
  return response.data;
};

export const getBalanceById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/balances/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteBalanceById = async (id: string) => {
  const response = await axios.delete(`/api/balances/${id}`);
  return response.data;
};
