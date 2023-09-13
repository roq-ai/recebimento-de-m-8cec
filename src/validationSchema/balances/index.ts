import * as yup from 'yup';

export const balanceValidationSchema = yup.object().shape({
  total_amount: yup.number().integer().nullable(),
  paid_amount: yup.number().integer().nullable(),
  due_amount: yup.number().integer().nullable(),
  last_payment_date: yup.date().nullable(),
  next_payment_date: yup.date().nullable(),
  supplier_id: yup.string().nullable().required(),
});
