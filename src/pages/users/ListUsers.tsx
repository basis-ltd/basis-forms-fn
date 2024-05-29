import Button from '@/components/inputs/Button';
import Loader from '@/components/inputs/Loader';
import RowSelectionCheckbox from '@/components/table/RowSelectionCheckbox';
import Table from '@/components/table/Table';
import { capitalizeString, formatDate } from '@/helpers/strings';
import { useLazyFetchUsersQuery } from '@/state/api/apiSlice';
import { setCreateUserModal, setUsersList } from '@/state/features/userSlice';
import { AppDispatch, RootState } from '@/state/store';
import { User } from '@/types/models/user';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ColumnDef, Row, Table as TableType } from '@tanstack/react-table';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorResponse } from 'react-router-dom';
import { toast } from 'react-toastify';
import CreateUser from './CreateUser';

const ListUsers = () => {
  // STATE VARIABLES
  const dispatch: AppDispatch = useDispatch();
  const { usersList, createUserModal } = useSelector((state: RootState) => state.user);

  // INITIALIZE LIST USERS QUERY
  const [
    fetchUsers,
    {
      data: usersData,
      error: usersError,
      isLoading: usersIsLoading,
      isError: usersIsError,
      isSuccess: usersIsSuccess,
    },
  ] = useLazyFetchUsersQuery();

  // FETCH USERS
  useEffect(() => {
    fetchUsers({
      take: 10,
      skip: 0,
      role: undefined,
    });
  }, [fetchUsers]);

  // HANDLE FETCH USERS RESPONSE
  useEffect(() => {
    if (usersIsError) {
      if ((usersError as ErrorResponse)?.status === 500) {
        toast.error('Failed to fetch users. Please try again later.');
      } else {
        toast.error((usersError as ErrorResponse)?.data?.message);
      }
    } else if (usersIsSuccess) {
      dispatch(setUsersList(usersData?.data));
    }
  }, [
    usersData,
    usersError,
    usersIsLoading,
    usersIsError,
    usersIsSuccess,
    dispatch,
  ]);

  // USERS COLUMNS
  const usersColumns = [
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
      header: 'Institution',
      accessorKey: 'institution',
      filterFn: (row: Row<unknown>, id: string, value: string) => {
        return value.includes(row.getValue(id));
      },
      enableSorting: true,
    },
    {
      header: 'Role',
      accessorKey: 'role',
      filterFn: (row: Row<unknown>, id: string, value: string) => {
        return value.includes(row.getValue(id));
      },
      enableSorting: true,
    },
    {
      header: 'Date added',
      accessorKey: 'createdAt',
    },
  ];

  return (
    <main className="flex flex-col gap-4 w-full">
      <menu className="flex items-center gap-3 justify-between">
        <h1 className="text-lg font-semibold uppercase">Users</h1>
        <Button
          onClick={(e) => {
            e.preventDefault();
            dispatch(setCreateUserModal(true));
          }}
          className="!gap-2"
          primary
        >
          <FontAwesomeIcon icon={faPlus} />
          <p className="text-[14px]">Add User</p>
        </Button>
      </menu>
      {usersIsLoading ? (
        <span className="h-[70vh] flex items-center justify-center w-full">
          <Loader />
        </span>
      ) : (
        <section className="flex flex-col gap-4 w-full">
          <Table
            data={usersList?.map((user: User, index) => {
              return {
                ...user,
                name: `${user?.firstName} ${user?.lastName || ''}`,
                no: index + 1,
                institution: user?.institution?.name,
                role: capitalizeString(user?.role),
                createdAt: formatDate(user.createdAt),
                updatedAt: formatDate(user.updatedAt),
              };
            })}
            columns={
              usersColumns as unknown as ColumnDef<
                {
                  name: string;
                  no: number;
                  institution: string;
                  role: string;
                  createdAt: string;
                  updatedAt: string;
                  id: string;
                  firstName: string;
                  lastName: string;
                  email: string;
                  institutionId: string;
                },
                unknown
              >[]
            }
          />
        </section>
      )}
      {createUserModal && <CreateUser />}
    </main>
  );
};

export default ListUsers;
