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
  Center,
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
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getDivergenceById, updateDivergenceById } from 'apiSdk/divergences';
import { divergenceValidationSchema } from 'validationSchema/divergences';
import { DivergenceInterface } from 'interfaces/divergence';
import { GoodsInterface } from 'interfaces/goods';
import { UserInterface } from 'interfaces/user';
import { getGoods } from 'apiSdk/goods';
import { getUsers } from 'apiSdk/users';

function DivergenceEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<DivergenceInterface>(
    () => (id ? `/divergences/${id}` : null),
    () => getDivergenceById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: DivergenceInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateDivergenceById(id, values);
      mutate(updated);
      resetForm();
      router.push('/divergences');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<DivergenceInterface>({
    initialValues: data,
    validationSchema: divergenceValidationSchema,
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
              label: 'Divergences',
              link: '/divergences',
            },
            {
              label: 'Update Divergence',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Divergence
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
          </Box>
        )}

        <FormWrapper onSubmit={formik.handleSubmit}>
          <NumberInput
            label="Expected Quantity"
            formControlProps={{
              id: 'expected_quantity',
              isInvalid: !!formik.errors?.expected_quantity,
            }}
            name="expected_quantity"
            error={formik.errors?.expected_quantity}
            value={formik.values?.expected_quantity}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('expected_quantity', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Received Quantity"
            formControlProps={{
              id: 'received_quantity',
              isInvalid: !!formik.errors?.received_quantity,
            }}
            name="received_quantity"
            error={formik.errors?.received_quantity}
            value={formik.values?.received_quantity}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('received_quantity', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Divergence Divergence"
            formControlProps={{
              id: 'divergence_divergence',
              isInvalid: !!formik.errors?.divergence_divergence,
            }}
            name="divergence_divergence"
            error={formik.errors?.divergence_divergence}
            value={formik.values?.divergence_divergence}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('divergence_divergence', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <FormControl id="analysis_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Analysis Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.analysis_date ? new Date(formik.values?.analysis_date) : null}
              onChange={(value: Date) => formik.setFieldValue('analysis_date', value)}
            />
          </FormControl>
          <AsyncSelect<GoodsInterface>
            formik={formik}
            name={'goods_id'}
            label={'Select Goods'}
            placeholder={'Select Goods'}
            fetcher={getGoods}
            labelField={'name'}
          />
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'analyst_id'}
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
              onClick={() => router.push('/divergences')}
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
    entity: 'divergence',
    operation: AccessOperationEnum.UPDATE,
  }),
)(DivergenceEditPage);
