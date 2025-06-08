import DefaultLayout from "@/layouts/default";
import { type User } from "@/types/user";
import { useUser } from "@/store/user";
import { Spinner } from "@heroui/react";

export default function OrderPage() {
    const user: User = useUser((state) => state.user);
    const loading = useUser((state) => state.loading);

    if (loading) {
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
            <div className="flex flex-col items-center justify-center p-6 max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-4">Orders</h1>
                <div className="text-sm text-gray-600 mb-2">
                    Here you can view all your orders.
                </div>
            </div>
        </DefaultLayout>
    );
}
