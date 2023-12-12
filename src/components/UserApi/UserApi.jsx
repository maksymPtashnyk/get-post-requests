import { useContext, useEffect } from 'react';
import { UserContext } from '../../context/Context';
import fetchUsers from '../Services/userService';

const UserAPI = () => {
  const {
    setUsers,
    page,
    setShowMoreButton,
    isRegistration,
    setIsRegistration,
    setPage,
  } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUsers(page, 6);
        const fetchedUsers = data.users;

        if (page !== 1 && isRegistration) {
          setPage(1);
          setUsers([fetchedUsers[0]]);
          setIsRegistration(false);
        } else if (page === 1 && isRegistration) {
          setUsers(prevUsers => [fetchedUsers[0], ...prevUsers]);
          setIsRegistration(false);
        } else if (page === 1) {
          setUsers(fetchedUsers);
        } else {
          setUsers(prevUsers => [...prevUsers, ...fetchedUsers]);
        }

        setShowMoreButton(data.links.next_url !== null);

      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, [page, isRegistration, setIsRegistration, setPage, setShowMoreButton, setUsers]);

  return null;
};

export default UserAPI;