import { useEffect } from "react";
import DefaultLayout from "@/layouts/default";
import { addToast, Spinner } from "@heroui/react";
import { CardGarment } from "@/components/card-garment";
import { useWishlist } from "@/store/wishlist";

export default function WishlistPage() {
    const wishlist = useWishlist((state) => state.wishlist);
    const loading = useWishlist((state) => state.loading);
    const getWishlist = useWishlist((state) => state.getWishlist);

    useEffect(() => {
        getWishlist({
            onError: (error) => {
                addToast({
                    title: "Error",
                    description: error.message || "Failed to load wishlist.",
                    color: "danger"
                });
            }
        });
    }, []);

    if (loading) {
        return (
            <DefaultLayout>
                <div className="flex flex-col items-center justify-center p-6 max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold mb-4">Wishlist</h1>
                    <Spinner size="lg" />
                </div>
            </DefaultLayout>
        );
    }

    return (
        <DefaultLayout>
            <div className="flex flex-col items-center justify-center p-6 max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-4">Wishlist</h1>
                {wishlist?.length > 0 ? (
                    <>
                        <div className="text-sm text-gray-600 mb-6">
                            {wishlist?.length} item{wishlist?.length !== 1 && "s"} in your wishlist
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
                            {wishlist.map((garment) => (
                                <div key={garment._id} className="flex flex-col gap-2">
                                    <CardGarment garment={garment} chips={[{ label: garment?.type, color: garment?.type === "new" ? "success" : "danger" }]} />
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <p className="text-center text-gray-500">Your wishlist is empty.</p>
                )}
            </div>
        </DefaultLayout>
    );
}
