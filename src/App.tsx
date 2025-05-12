import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Loaders
import { checkUnauthLoader, checkAuthLoader } from "./loaders/auth";

// Pages
import IndexPage from "@/pages/index";
import DocsPage from "@/pages/docs";
import LoginPage from "@/pages/login";
import SignUpPage from "@/pages/sign-up";
import SignUpCompanyPage from "@/pages/sign-up-company";
import NotFound from "./pages/not-found";
import ProfilePage from "./pages/profile";

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage />,
        loader: checkUnauthLoader
    },
    {
        path: "/sign-up",
        element: <SignUpPage />,
        loader: checkUnauthLoader
    },
    {
        path: "/sign-up-company",
        element: <SignUpCompanyPage />,
        loader: checkUnauthLoader
    },
    {
        path: "/profile",
        element: <ProfilePage />,
        loader: checkAuthLoader
    },
    {
        path: "/",
        children: [
            { index: true, element: <IndexPage /> },
            {
                path: "/docs",
                id: "docs",
                element: <DocsPage />
            }
        ],
        loader: checkAuthLoader
    },
    { path: "*", element: <NotFound />, loader: checkAuthLoader }
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
