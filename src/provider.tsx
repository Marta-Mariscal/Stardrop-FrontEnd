import type { NavigateOptions } from "react-router-dom";

import {ToastProvider} from "@heroui/toast";

declare module "@react-types/shared" {
    interface RouterConfig {
        routerOptions: NavigateOptions;
    }
}

export function Provider({ children }: { children: React.ReactNode }) {
    return (
        <>
            <ToastProvider />
            {children}
        </>
    );
}
