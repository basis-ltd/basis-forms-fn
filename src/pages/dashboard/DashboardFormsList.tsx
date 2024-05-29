import Loader from '@/components/inputs/Loader';
import Table from '@/components/table/Table';
import { capitalizeString, formatDate } from '@/helpers/strings';
import { useLazyFetchFormsQuery } from '@/state/api/apiSlice';
import { setFormsList } from '@/state/features/formSlice';
import { AppDispatch, RootState } from '@/state/store';
import { Form } from '@/types/models/form';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorResponse, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const DashboardFormsList = () => {
  // STATE VARIABLES
  const dispatch: AppDispatch = useDispatch();
  const { formsList } = useSelector((state: RootState) => state.form);

  // NAVIGATION 
  const navigate = useNavigate();

  // INITIALIZE FETCH FORMS QUERY
  const [
    fetchForms,
    {
      data: formsData,
      error: formsError,
      isError: formsIsError,
      isLoading: formsIsLoading,
      isSuccess: formsIsSuccess,
    },
  ] = useLazyFetchFormsQuery();

  // FETCH FORMS
  useEffect(() => {
    fetchForms({});
  }, [fetchForms]);

  // HANDLE FETCH FORMS RESPONSE
  useEffect(() => {
    if (formsIsError) {
      if ((formsError as ErrorResponse)?.status === 500) {
        toast.error('Could not fetch forms. Please try again later.');
      } else {
        toast.error((formsError as ErrorResponse)?.data.message);
      }
    } else if (formsIsSuccess) {
      dispatch(setFormsList(formsData?.data));
    }
  }, [dispatch, formsData, formsError, formsIsError, formsIsSuccess]);

  // FORM COLUMNS
  const formColumns = [
    {
      id: 'no',
      accessorKey: 'no',
      header: 'No',
    },
    {
      header: 'Name',
      accessorKey: 'name',
    },
    {
      header: 'Visibility',
      accessorKey: 'visibility',
    },
    {
      header: 'Project',
      accessorKey: 'project',
    },
    {
      header: 'Sections',
      accessorKey: 'sectionsCount',
    },
    {
      header: 'Date Added',
      accessorKey: 'createdAt',
    },
    {
        header: 'Created by',
        accessorKey: 'createdBy',
      },
  ];

  return (
    <section className="flex flex-col gap-3 w-full">
      {formsIsLoading ? (
        <figure className="h-full flex items-center justify-center w-full">
          <Loader />
        </figure>
      ) : (
        formsIsSuccess && (
          <Table
            rowClickHandler={(row) => {
              navigate(`/dashboard/forms/${row.id}`);
            }}
            showFilter={false}
            showPagination={false}
            data={formsList?.map((form: Form, index) => {
              return {
                no: index + 1,
                ...form,
                visibility: capitalizeString(form.visibility),
                createdAt: formatDate(form.createdAt),
                project: form.project?.name,
                createdBy: `${form.user?.firstName} ${form.user?.lastName}`,
              };
            })}
            columns={formColumns}
          />
        )
      )}
    </section>
  );
};

export default DashboardFormsList;
