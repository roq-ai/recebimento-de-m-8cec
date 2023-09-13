import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createGoods } from 'apiSdk/goods';
import { goodsValidationSchema } from 'validationSchema/goods';
import { SupplierInterface } from 'interfaces/supplier';
import { UserInterface } from 'interfaces/user';
import { getSuppliers } from 'apiSdk/suppliers';
import { getUsers } from 'apiSdk/users';
import { GoodsInterface } from 'interfaces/goods';

function GoodsCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: GoodsInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createGoods(values);
      resetForm();
      router.push('/goods');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<GoodsInterface>({
    initialValues: {
      name: '',
      quantity: 0,
      received_date: new Date(new Date().toDateString()),
      status: '',
      supplier_id: (router.query.supplier_id as string) ?? null,
      receiver_id: (router.query.receiver_id as string) ?? null,
    },
    validationSchema: goodsValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Goods',
              link: '/goods',
            },
            {
              label: 'Create Goods',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Goods
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.name}
            label={'Name'}
            props={{
              name: 'name',
              placeholder: 'Name',
              value: formik.values?.name,
              onChange: formik.handleChange,
            }}
          />

          <NumberInput
            label="Quantity"
            formControlProps={{
              id: 'quantity',
              isInvalid: !!formik.errors?.quantity,
            }}
            name="quantity"
            error={formik.errors?.quantity}
            value={formik.values?.quantity}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('quantity', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <FormControl id="received_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Received Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.received_date ? new Date(formik.values?.received_date) : null}
              onChange={(value: Date) => formik.setFieldValue('received_date', value)}
            />
          </FormControl>

          <TextInput
            error={formik.errors.status}
            label={'Status'}
            props={{
              name: 'status',
              placeholder: 'Status',
              value: formik.values?.status,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<SupplierInterface>
            formik={formik}
            name={'supplier_id'}
            label={'Select Supplier'}
            placeholder={'Select Supplier'}
            fetcher={getSuppliers}
            labelField={'name'}
          />
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'receiver_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/goods')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'goods',
    operation: AccessOperationEnum.CREATE,
  }),
)(GoodsCreatePage);
