import { createContext } from "react";
import { User } from "../types/User";

type UserContextType = {
    user: User | null;
    setUser: (user: User | null) => void;
}

const defaultContext = {
    user: null,
    setUser: () => {}
}

export const UserContext = createContext<UserContextType>(defaultContext);