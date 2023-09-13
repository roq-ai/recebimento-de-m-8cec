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

import { createBalance } from 'apiSdk/balances';
import { balanceValidationSchema } from 'validationSchema/balances';
import { SupplierInterface } from 'interfaces/supplier';
import { getSuppliers } from 'apiSdk/suppliers';
import { BalanceInterface } from 'interfaces/balance';

function BalanceCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: BalanceInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createBalance(values);
      resetForm();
      router.push('/balances');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<BalanceInterface>({
    initialValues: {
      total_amount: 0,
      paid_amount: 0,
      due_amount: 0,
      last_payment_date: new Date(new Date().toDateString()),
      next_payment_date: new Date(new Date().toDateString()),
      supplier_id: (router.query.supplier_id as string) ?? null,
    },
    validationSchema: balanceValidationSchema,
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
              label: 'Balances',
              link: '/balances',
            },
            {
              label: 'Create Balance',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Balance
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <NumberInput
            label="Total Amount"
            formControlProps={{
              id: 'total_amount',
              isInvalid: !!formik.errors?.total_amount,
            }}
            name="total_amount"
            error={formik.errors?.total_amount}
            value={formik.values?.total_amount}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('total_amount', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Paid Amount"
            formControlProps={{
              id: 'paid_amount',
              isInvalid: !!formik.errors?.paid_amount,
            }}
            name="paid_amount"
            error={formik.errors?.paid_amount}
            value={formik.values?.paid_amount}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('paid_amount', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Due Amount"
            formControlProps={{
              id: 'due_amount',
              isInvalid: !!formik.errors?.due_amount,
            }}
            name="due_amount"
            error={formik.errors?.due_amount}
            value={formik.values?.due_amount}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('due_amount', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <FormControl id="last_payment_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Last Payment Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.last_payment_date ? new Date(formik.values?.last_payment_date) : null}
              onChange={(value: Date) => formik.setFieldValue('last_payment_date', value)}
            />
          </FormControl>
          <FormControl id="next_payment_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Next Payment Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.next_payment_date ? new Date(formik.values?.next_payment_date) : null}
              onChange={(value: Date) => formik.setFieldValue('next_payment_date', value)}
            />
          </FormControl>
          <AsyncSelect<SupplierInterface>
            formik={formik}
            name={'supplier_id'}
            label={'Select Supplier'}
            placeholder={'Select Supplier'}
            fetcher={getSuppliers}
            labelField={'name'}
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
              onClick={() => router.push('/balances')}
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
    entity: 'balance',
    operation: AccessOperationEnum.CREATE,
  }),
)(BalanceCreatePage);
