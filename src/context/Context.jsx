import { createContext, useState } from 'react';

const UserContext = createContext();

const UserContextProvider = ({children}) => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [showMoreButton, setShowMoreButton] = useState(true);
  const [isRegistration, setIsRegistration] = useState(false)
  return (
    <UserContext.Provider value={{users, setUsers, page, setPage, showMoreButton, setShowMoreButton, isRegistration, setIsRegistration}}>
       {children}
    </UserContext.Provider>
    );
}

export {UserContext, UserContextProvider};