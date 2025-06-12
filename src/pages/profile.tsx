import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { useNavigate } from "react-router-dom";
import { Button, Image, Spinner } from "@heroui/react";
import { useUser } from "../store/user";
import { useGarments } from "@/store/garments";
import { useCart } from "@/store/cart";
import { CardGarment } from "@/components/card-garment";
import { useEffect } from "react";
import defaultImage from "../../assets/img/icon-default.png";

export default function ProfilePage() {
    const { user } = useUser();
    const loadingUser = useUser((state) => state.loading);
    const logout = useUser((state) => state.logout);
    const garments = useGarments((state) => state.garments);
    const loading = useGarments((state) => state.loading);
    const getGarments = useGarments((state) => state.getGarments);
    const clearCart = useCart((state) => state.clearCart);
    const navigate = useNavigate();

    useEffect(() => {
        getGarments({ me: true });
    }, []);

    const goPostGarmentHandler = () => {
        navigate("/form-post-garment", { replace: true });
    };

    const goOrdersHandler = () => {
        navigate("/order", { replace: true });
    };

    const goUpdateHandler = () => {
        if (user?.type == "customer") {
            navigate("/form-profile-edit", { replace: true });
        } else {
            navigate("/form-profile-edit-company", { replace: true });
        }
    };

    const onSuccessLogoutHandler = () => {
        clearCart();
        navigate("/login", { replace: true });
    };

    const handleLogout = () => {
        logout({ onSuccess: onSuccessLogoutHandler });
    };

    if (loadingUser) {
        return (
            <DefaultLayout>
                <div className="flex justify-center pt-5">
                    <Spinner color="secondary" label="Loading..." labelColor="secondary" />
                </div>
            </DefaultLayout>
        );
    }

    return (
        <DefaultLayout>
            <section className="flex flex-col items-center gap-6 px-4 w-full">
                <div className="w-full max-w-4xl bg-purple-100 dark:bg-purple-900 rounded-xl p-6 flex flex-col sm:flex-row items-center gap-4">
                    <Image src={user?.icon || defaultImage} alt="User avatar" className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-2 border-secondary" />
                    <div className="flex-1 flex flex-col justify-center items-center sm:items-start w-full gap-6">
                        <h1 className={`${title()} text-3xl sm:text-4xl`}>{user?.name}</h1>
                        <div className="text-center sm:text-left text-sm text-default-600 dark:text-default-400 space-y-1">
                            <div>📍 {user?.address}</div>
                            {user?.web && (
                                <div>
                                    <a href={user?.web} target="_blank" rel="noopener noreferrer" className="underline text-secondary">
                                        {user?.web}
                                    </a>
                                </div>
                            )}
                            <div>
                                📞 <strong>{user?.email}</strong> <span className="text-default-500">{"//"}</span> <strong>{user?.phone}</strong>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <Button color="secondary" className="text-sm sm:text-base" onPress={goUpdateHandler}>
                            Edit Profile
                        </Button>
                        {user?.type == "company" && (
                            <Button color="secondary" className="text-sm sm:text-base" onPress={goPostGarmentHandler}>
                                Post Garment
                            </Button>
                        )}
                        {user?.type == "customer" && (
                            <Button color="secondary" className="text-sm sm:text-base" onPress={goOrdersHandler}>
                                View Orders
                            </Button>
                        )}
                        <Button color="danger" variant="light" className="text-sm sm:text-base" onPress={handleLogout}>
                            Log out
                        </Button>
                    </div>
                </div>

                <div className="w-full max-w-4xl space-y-1 text-default-700 dark:text-default-300 text-sm sm:text-base text-center">
                    {user?.description && <div>{user?.description}</div>}
                </div>

                {!loading && !garments?.length && (
                    <div className="text-center mt-4">
                        <p className="text-lg font-bold">No garments posted</p>
                        <p className="text-sm text-gray-500">Try post some garments!</p>
                    </div>
                )}

                {!loading && garments?.length && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4">
                        {garments.map((garment) => (
                            <CardGarment key={garment._id} garment={garment} />
                        ))}
                    </div>
                )}
            </section>
        </DefaultLayout>
    );
}
