import Loader from '@/components/inputs/Loader';
import { useLazyFetchUsersQuery } from '@/state/api/apiSlice';
import { setUsersList } from '@/state/features/userSlice';
import { AppDispatch, RootState } from '@/state/store';
import { User } from '@/types/models/user';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorResponse, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const DashboardUsersList = () => {
  // STATE VARIABLES
  const dispatch: AppDispatch = useDispatch();
  const { usersList } = useSelector((state: RootState) => state.user);

  // INITIALIZE FETCH USERS QUERY
  const [
    fetchUsers,
    {
      data: usersData,
      error: usersError,
      isError: usersIsError,
      isLoading: usersIsLoading,
      isSuccess: usersIsSuccess,
    },
  ] = useLazyFetchUsersQuery();

  // FETCH USERS
  useEffect(() => {
    fetchUsers({});
  }, [fetchUsers]);

  // HANDLE FETCH USERS RESPONSE
  useEffect(() => {
    if (usersIsError) {
      if ((usersError as ErrorResponse).status === 500) {
        toast.error('Could not fetch users. Please try again later.');
      } else {
        toast.error((usersError as ErrorResponse).data.message);
      }
    } else if (usersIsSuccess) {
      dispatch(setUsersList(usersData?.data));
    }
  }, [dispatch, usersData, usersError, usersIsError, usersIsSuccess]);

  return (
    <section className="flex flex-col gap-3 w-full h-full py-2">
      {usersIsLoading ? (
        <figure className="h-full flex items-center justify-center w-full">
          <Loader />
        </figure>
      ) : (
        <menu className="flex flex-col gap-3 w-full">
          {usersList?.map((user: User, index) => {
            return (
              <Link
                to={`/dashboard/users/${user.id}`}
                key={index}
                className="flex items-center gap-3 pr-2 py-1 justify-between bg-white rounded-md shadow-sm w-full hover:bg-primary hover:text-white"
              >
                <ul className='flex items-center gap-3 p-1 px-2'>
                <p className="text-[14px]">{index + 1}.</p>
                <p className="text-[14px]">
                  {user.firstName} {user?.lastName || ''}
                </p>
                </ul>
                <FontAwesomeIcon icon={faArrowRight} className='text-[14px]' />
              </Link>
            );
          })}
        </menu>
      )}
    </section>
  );
};

export default DashboardUsersList;
