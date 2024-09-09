"use client";

import React, { createContext, useEffect, useState } from "react";
import { getLogged } from "../services/auth";

interface IAuthContext {
  id: string;
  setId: React.Dispatch<React.SetStateAction<string>>;
}

interface AuthContextProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<IAuthContext>({
  id: "",
  setId: () => {},
});

const AuthProvider = ({ children }: AuthContextProps) => {
  const [id, setId] = useState<string>("");

  useEffect(() => {
    const checkLogged = async () => {
      try {
        const logged = await getLogged();

        if (logged) {
          setId(logged);
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkLogged();
  }, [id]);

  return <AuthContext.Provider value={{ id, setId }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
