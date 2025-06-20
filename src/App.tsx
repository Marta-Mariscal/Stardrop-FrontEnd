import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { checkUnauthLoader, checkAuthLoader } from "./loaders/auth";
import { getGarmentByIdLoader } from "./loaders/garment";
import IndexPage from "@/pages/index";
import NotFound from "./pages/not-found";
import ProfilePage from "./pages/profile";
import FormProfileEditPage from "./pages/form-profile-edit";
import FormPostGarmentPage from "./pages/form-post-garment";
import CartPage from "./pages/cart";
import WishlistPage from "./pages/wishlist";
import GarmentPage from "./pages/garment";
import LoginPage from "./pages/login";
import SignUpPage from "./pages/sign-up";
import SignUpCompanyPage from "./pages/sign-up-company";
import FormProfileEditCompanyPage from "./pages/form-profile-edit-company";
import OrderPage from "./pages/order";

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
        path: "/",
        children: [
            { index: true, element: <IndexPage /> },
            {
                path: "/profile",
                id: "profile",
                element: <ProfilePage />
            },
            {
                path: "/form-profile-edit",
                id: "form-profile-edit",
                element: <FormProfileEditPage />
            },
            {
                path: "/form-profile-edit-company",
                id: "form-profile-edit-company",
                element: <FormProfileEditCompanyPage />
            },
            {
                path: "/form-post-garment",
                id: "form-post-garment",
                element: <FormPostGarmentPage />
            },
            {
                path: "/form-post-garment/:id",
                id: "form-post-garment-second-hand",
                element: <FormPostGarmentPage />,
                loader: getGarmentByIdLoader
            },
            {
                path: "/cart",
                id: "cart",
                element: <CartPage />
            },
            {
                path: "/wishlist",
                id: "wishlist",
                element: <WishlistPage />
            },
            {
                path: "/garment/:id",
                element: <GarmentPage />,
                loader: getGarmentByIdLoader
            },
            {
                path: "/order",
                id: "order",
                element: <OrderPage />
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
