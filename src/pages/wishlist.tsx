import { useState, useEffect } from "react";
import DefaultLayout from "@/layouts/default";
import { Button, Divider, Spinner } from "@heroui/react";
import { CardGarment } from "@/components/card-garment";
import { type Garment } from "@/types/garment";
import { type Wishlist } from "@/types/wishlist";
import { useUser } from "@/store/user";

export default function WishlistPage() {
  const user = useUser((state) => state.user);
  const updateUser = useUser((state) => state.update);
  const loading = useUser((state) => state.loading);

  const [wishlistItems, setWishlistItems] = useState<Garment[]>([]);

  useEffect(() => {
    if (user?.wishlist?.garments && Array.isArray(user.wishlist.garments)) {
      setWishlistItems(user.wishlist.garments);
    } else {
      setWishlistItems([]);
    }
  }, [user]);

  const removeItem = (index: number) => {
    if (!user || !user.wishlist) return;

    const updatedGarments = [...wishlistItems];
    updatedGarments.splice(index, 1);

    setWishlistItems(updatedGarments);

    const updatedWishlist: Wishlist = {
      ...user.wishlist,
      garments: updatedGarments,
    };

    updateUser(
      { ...user, wishlist: updatedWishlist },
      {
        onSuccess: (updatedUser) => {
          useUser.setState({ user: updatedUser });
        },
        onError: (error) => {
          alert("Error al actualizar la wishlist: " + error.message);
          setWishlistItems(user.wishlist?.garments || []);
        },
      }
    );
  };

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
        <h1 className="text-3xl font-bold mb-4">Wishlist</h1>
        <div className="text-sm text-gray-600 mb-6">
          {wishlistItems.length} item{wishlistItems.length !== 1 && "s"} in your wishlist
        </div>

        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
            {wishlistItems.map((garment, index) => (
              <div key={garment._id} className="flex flex-col gap-2">
                <CardGarment garment={garment} />
                <Button
                  size="sm"
                  variant="light"
                  color="danger"
                  onPress={() => removeItem(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">Your wishlist is empty.</p>
        )}

        {wishlistItems.length > 0 && <Divider className="my-8" />}
      </div>
    </DefaultLayout>
  );
}
