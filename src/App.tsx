import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { checkUnauthLoader, checkAuthLoader, getGarmentByIdLoader } from "./loaders/auth";

import IndexPage from "@/pages/index";
import DocsPage from "@/pages/docs";
import LoginPage from "@/pages/login";
import SignUpPage from "@/pages/sign-up";
import SignUpCompanyPage from "@/pages/sign-up-company";
import NotFound from "./pages/not-found";
import ProfilePage from "./pages/profile";
import FormProfileEditPage from "./pages/form-profile-edit";
import FormPostGarmentPage from "./pages/form-post-garment";
import CartPage from "./pages/cart";
import WishlistPage from "./pages/wishlist";
import GarmentPage from "./pages/garment";

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
        path: "/form-profile-edit",
        element: <FormProfileEditPage />,
        loader: checkAuthLoader
    },
    {
        path: "/form-post-garment",
        element: <FormPostGarmentPage />,
        loader: checkAuthLoader
    },
    {
        path: "/cart",
        element: <CartPage />,
        loader: checkAuthLoader
    },
    {
        path: "/wishlist",
        element: <WishlistPage />,
        loader: checkAuthLoader
    },
    {
        path: "/garment/:id",
        element: <GarmentPage />,
        loader: getGarmentByIdLoader
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
