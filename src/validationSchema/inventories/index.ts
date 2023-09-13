import * as yup from 'yup';

export const inventoryValidationSchema = yup.object().shape({
  quantity: yup.number().integer().nullable(),
  last_updated: yup.date().nullable(),
  status: yup.string().nullable(),
  location: yup.string().nullable(),
  goods_id: yup.string().nullable().required(),
  updated_by: yup.string().nullable().required(),
});
