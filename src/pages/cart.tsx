import { useState } from "react";
import DefaultLayout from "@/layouts/default";
import { Drawer, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter, Button, Divider, Spinner } from "@heroui/react";
import { CardGarment } from "@/components/card-garment";
import { type User } from "@/types/user";
import { type GarmentItem } from "@/types/garment-item";
import { useUser } from "@/store/user";
import confetti from "canvas-confetti";
import { useCart } from "@/store/cart";

export default function CartPage() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const cart = useCart((state) => state.cart);
    const totalPrice = useCart((state) => state.getTotalPrice());
    const addToCart = useCart((state) => state.addToCart);
    const removeItem = useCart((state) => state.removeOneItemFromCart);
    const removeAllItems = useCart((state) => state.removeAllItemsFromCart);
    const user: User = useUser((state) => state.user);
    const loading = useUser((state) => state.loading);

    const addToCartHandler = (item: GarmentItem) => {
        return () => {
            addToCart(item);
        };
    };

    const removeItemHandler = (item: GarmentItem) => {
        return () => {
            removeItem(item);
        };
    };

    const removeAllItemsHandler = (item: GarmentItem) => {
        return () => {
            removeAllItems(item);
        };
    };

    const makeOrder = () => {
        confetti({
            particleCount: 250,
            startVelocity: 30,
            spread: 360,
            origin: { y: 0.3 }
        });
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
                <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
                <div className="text-sm text-gray-600 mb-2">
                    {cart?.length || 0} item{cart?.length > 1 && "s"} in the cart
                </div>

                <div className="text-lg font-semibold mb-6 text-secondary">Total: {totalPrice.toFixed(2)} €</div>

                {cart?.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
                        {cart.map((item) => (
                            <div key={item.base._id} className="flex flex-col gap-2">
                                <CardGarment
                                    garment={item.base}
                                    chips={[
                                        { label: item.base?.type, color: item.base?.type === "new" ? "success" : "danger" },
                                        { label: item.size, color: "secondary" }
                                    ]}
                                />
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        {item.base.type === "new" && (
                                            <>
                                                <Button size="sm" variant="light" onPress={removeItemHandler(item)}>
                                                    -
                                                </Button>
                                                <span className="font-medium">{item.quantity}</span>
                                                <Button size="sm" variant="light" onPress={addToCartHandler(item)}>
                                                    +
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                    <Button size="sm" variant="light" color="danger" onPress={removeAllItemsHandler(item)} className="">
                                        Remove
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">Your cart is empty.</p>
                )}

                {cart?.length > 0 && (
                    <Button color="secondary" className="mt-8 px-6 py-3" onPress={() => setIsDrawerOpen(true)}>
                        Buy now
                    </Button>
                )}

                <Drawer placement="right" isOpen={isDrawerOpen} onOpenChange={setIsDrawerOpen} isDismissable={true} isKeyboardDismissDisabled={false}>
                    <DrawerContent className="w-96 bg-white shadow-xl border-l border-gray-200">
                        <DrawerHeader className="text-xl font-bold px-6 py-4 bg-secondary text-white rounded-t-md">Information</DrawerHeader>

                        <DrawerBody className="space-y-6 px-6 py-4">
                            <section className="space-y-2">
                                <h3 className="text-secondary text-lg font-semibold flex items-center gap-1">User details</h3>
                                <div className="text-sm text-gray-700 space-y-1">
                                    <p>
                                        <span className="font-semibold">Name:</span> {user?.name || "Invitado"}
                                    </p>
                                    <p>
                                        <span className="font-semibold">Address:</span> {user?.address || "N/A"}
                                    </p>
                                    <p>
                                        <span className="font-semibold">Phone:</span> {user?.phone || "N/A"}
                                    </p>
                                </div>
                            </section>

                            <Divider />

                            <section className="space-y-2">
                                <h3 className="text-secondary text-lg font-semibold flex items-center gap-1">Card details</h3>
                                <div className="text-sm text-gray-700 space-y-1">
                                    <p>
                                        <span className="font-semibold">Number:</span> {user?.cardNumber ? `**** **** **** ${user?.cardNumber.slice(-4)}` : "**** **** **** 0000"}
                                    </p>
                                    <p>
                                        <span className="font-semibold">Expiration:</span> {user?.cardExpirationDate || "MM/YY"}
                                    </p>
                                    <p>
                                        <span className="font-semibold">Holder name:</span> {user?.cardHolderName || user?.name || "N/A"}
                                    </p>
                                </div>
                            </section>

                            <Divider />

                            <section className="space-y-2">
                                <h3 className="text-secondary text-lg font-semibold flex items-center gap-1">Order total</h3>
                                <p className="text-xl font-bold text-gray-900">{totalPrice.toFixed(2)} €</p>
                            </section>
                        </DrawerBody>

                        <DrawerFooter className="flex justify-between px-6 py-4 bg-gray-50 border-t">
                            <Button variant="light" color="secondary" onPress={() => setIsDrawerOpen(false)}>
                                Cancel
                            </Button>
                            <Button color="secondary" onPress={makeOrder}>
                                Confirm purchase
                            </Button>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </div>
        </DefaultLayout>
    );
}
