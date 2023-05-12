/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext } from 'react';

import { useSession } from './hooks';

const AuthContext = createContext(undefined);

// η AuthProvider δέχεται το παρακάτω prop:
// children: τα παιδιά του component
export function AuthProvider({ children }) {
  const { isLoading, session } = useSession();

  if (isLoading) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  return <AuthContext.Provider value={session}>{children}</AuthContext.Provider>;
}

// η useAuth() επιστρέφει το context του AuthProvider
export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
