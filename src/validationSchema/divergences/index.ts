import * as yup from 'yup';

export const divergenceValidationSchema = yup.object().shape({
  expected_quantity: yup.number().integer().nullable(),
  received_quantity: yup.number().integer().nullable(),
  divergence_divergence: yup.number().integer().nullable(),
  analysis_date: yup.date().nullable(),
  goods_id: yup.string().nullable().required(),
  analyst_id: yup.string().nullable().required(),
});
