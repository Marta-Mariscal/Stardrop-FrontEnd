import type { NavigateOptions } from "react-router-dom";

// Hero UI
import {ToastProvider} from "@heroui/toast";

// Providers
import { UserProvider } from "./context/user";

declare module "@react-types/shared" {
    interface RouterConfig {
        routerOptions: NavigateOptions;
    }
}

export function Provider({ children }: { children: React.ReactNode }) {
    return (
        <UserProvider>
            <ToastProvider />
            {children}
        </UserProvider>
    );
}
