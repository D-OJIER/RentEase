import React from 'react';
import { UserProvider } from './UserContext'; // Context for userType
import AppNavigation from './Navigation'; // Main navigation

const App = () => {
  return (
    <UserProvider>
      <AppNavigation />
    </UserProvider>
  );
};

export default App;
