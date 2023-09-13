import * as yup from 'yup';

export const supplierValidationSchema = yup.object().shape({
  description: yup.string().nullable(),
  address: yup.string().nullable(),
  contact_number: yup.string().nullable(),
  contact_person: yup.string().nullable(),
  name: yup.string().required(),
  user_id: yup.string().nullable().required(),
});
