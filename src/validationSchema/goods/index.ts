import * as yup from 'yup';

export const goodsValidationSchema = yup.object().shape({
  name: yup.string().required(),
  quantity: yup.number().integer().nullable(),
  received_date: yup.date().nullable(),
  status: yup.string().nullable(),
  supplier_id: yup.string().nullable().required(),
  receiver_id: yup.string().nullable().required(),
});
