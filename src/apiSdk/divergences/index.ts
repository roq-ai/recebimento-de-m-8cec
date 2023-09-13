import axios from 'axios';
import queryString from 'query-string';
import { DivergenceInterface, DivergenceGetQueryInterface } from 'interfaces/divergence';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getDivergences = async (
  query?: DivergenceGetQueryInterface,
): Promise<PaginatedInterface<DivergenceInterface>> => {
  const response = await axios.get('/api/divergences', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createDivergence = async (divergence: DivergenceInterface) => {
  const response = await axios.post('/api/divergences', divergence);
  return response.data;
};

export const updateDivergenceById = async (id: string, divergence: DivergenceInterface) => {
  const response = await axios.put(`/api/divergences/${id}`, divergence);
  return response.data;
};

export const getDivergenceById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/divergences/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteDivergenceById = async (id: string) => {
  const response = await axios.delete(`/api/divergences/${id}`);
  return response.data;
};
