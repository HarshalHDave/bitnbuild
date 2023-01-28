import React, { useState, useEffect, useContext, createContext } from "react";
interface Authcon {
  user: user;
}
interface user {
  id: string;
  token: string;
}
const appContext = createContext<Authcon | null>(null);

export function ContextProvider({ children }: any) {
  const context = useContextProvided();
  return <appContext.Provider value={context}>{children}</appContext.Provider>;
}

export const useAppContext = () => {
  return useContext(appContext);
};
function useContextProvided() {
  const [user, setUser] = useState<user | null>(null);
  useEffect(() => {}, []);
}
