import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userType, setUserType] = useState('Renter'); // Default user type

  const switchUserType = () => {
    setUserType((prevType) => (prevType === 'Renter' ? 'Lender' : 'Renter'));
  };

  return (
    <UserContext.Provider value={{ userType, switchUserType }}>
      {children}
    </UserContext.Provider>
  );
};
