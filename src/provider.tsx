import type { NavigateOptions } from "react-router-dom";
import { ToastProvider } from "@heroui/react";
import { UserProvider } from "./context/user";

declare module "@react-types/shared" {
    interface RouterConfig {
        routerOptions: NavigateOptions;
    }
}

export function Provider({ children }: { children: React.ReactNode }) {
    return (
        //cada vez que se cambie de pagina o se haga un refresh se va a volver a comprobar el token
        <UserProvider>
            <ToastProvider />
            {children}
        </UserProvider>
    );
}
