import Button from '@/components/inputs/Button';
import Loader from '@/components/inputs/Loader';
import RowSelectionCheckbox from '@/components/table/RowSelectionCheckbox';
import Table from '@/components/table/Table';
import { capitalizeString, formatDate } from '@/helpers/strings';
import { useLazyFetchInstitutionsQuery } from '@/state/api/apiSlice';
import {
  setCreateInstitutionModal,
  setInstitutionsList,
} from '@/state/features/institutionSlice';
import { AppDispatch, RootState } from '@/state/store';
import { Institution } from '@/types/models/institution';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ColumnDef, Row, Table as TableType } from '@tanstack/react-table';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorResponse, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import CreateInstitution from './CreateInstitution';

const ListInstitutions = () => {
  // STATE VARIABLES
  const dispatch: AppDispatch = useDispatch();
  const { institutionsList, createInstitutionModal } = useSelector(
    (state: RootState) => state.institution
  );

  // INITIALIZE LIST INSTITUTIONS QUERY
  const [
    fetchInstitutions,
    {
      data: institutionsData,
      error: institutionsError,
      isLoading: institutionsIsLoading,
      isSuccess: institutionsIsSuccess,
      isError: institutionsIsError,
    },
  ] = useLazyFetchInstitutionsQuery();

  // GET QUERY PARAMETERS
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const categoryId = queryParams.get('categoryId');

  // LIST INSTITUTIONS
  useEffect(() => {
    fetchInstitutions({
      categoryId,
    });
  }, [categoryId, fetchInstitutions]);

  // HANDLE INSTITUTIONS RESPONSE
  useEffect(() => {
    if (institutionsIsError) {
      if ((institutionsError as ErrorResponse)?.status === 500) {
        toast.error('Failed to fetch institutions. Please try again later.');
      } else {
        toast.error((institutionsError as ErrorResponse)?.data?.message);
      }
    } else if (institutionsIsSuccess) {
      dispatch(setInstitutionsList(institutionsData?.data));
    }
  }, [
    institutionsData,
    institutionsError,
    institutionsIsSuccess,
    institutionsIsError,
    dispatch,
  ]);

  // INSTITUTION COLUMNS
  const institutionColumns = [
    {
      id: 'no',
      accessorKey: 'no',
      header: ({
        table,
      }: {
        table: TableType<{
          name: string;
          image: string;
        }>;
      }) => {
        return <RowSelectionCheckbox isHeader table={table} />;
      },
      cell: ({
        row,
      }: {
        row: Row<{
          name: string;
          image: string;
        }>;
      }) => {
        return <RowSelectionCheckbox row={row} />;
      },
    },
    {
      header: 'Name',
      accessorKey: 'name',
    },
    {
      header: 'Email',
      accessorKey: 'email',
    },
    {
      header: 'Phone',
      accessorKey: 'phone',
    },
    {
      header: 'Address',
      accessorKey: 'address',
    },
    {
      header: 'Category',
      accessorKey: 'category',
      filterFn: (row: Row<unknown>, id: string, value: string) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      header: 'Date Added',
      accessorKey: 'createdAt',
    },
  ];

  return (
    <main className="flex flex-col gap-4 w-full">
      <menu className="flex items-center gap-3 w-full justify-between">
        <h1 className="text-primary font-semibold uppercase text-lg">
          Institutions
        </h1>
        <Button
          className="flex items-center gap-2"
          primary
          onClick={(e) => {
            e.preventDefault();
            dispatch(setCreateInstitutionModal(true));
          }}
        >
          <FontAwesomeIcon icon={faPlus} />
          Create Institution
        </Button>
      </menu>
      {institutionsIsLoading ? (
        <figure className="h-[60vh] flex items-center w-full justify-center">
          <Loader />
        </figure>
      ) : (
        <section className="flex flex-col gap-4">
          <Table
            data={institutionsList?.map(
              (institution: Institution, index: number) => {
                return {
                  ...institution,
                  no: index + 1,
                  createdAt: formatDate(institution.createdAt),
                  category: capitalizeString(institution.category?.name),
                };
              }
            )}
            columns={
              institutionColumns as unknown as ColumnDef<
                {
                  no: number;
                  createdAt: string;
                  id: string;
                  name: string;
                  description: string | null;
                  email: string;
                  phone: string | null;
                  isActive: boolean;
                  address: string | null;
                  categoryId: string;
                  updatedAt: Date;
                  category: string;
                },
                unknown
              >[]
            }
          />
        </section>
      )}
      {createInstitutionModal && <CreateInstitution />}
    </main>
  );
};

export default ListInstitutions;
