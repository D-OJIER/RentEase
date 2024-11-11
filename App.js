import React from 'react';
import { UserProvider } from './UserContext'; // Corrected import path
import AppNavigation from './Navigation'; // Import your navigation

const App = () => {
  return (
    <UserProvider> {/* Corrected the usage */}
      <AppNavigation />
    </UserProvider>
  );
};

export default App;
