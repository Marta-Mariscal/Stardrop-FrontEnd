import { useState, useEffect } from "react";
import DefaultLayout from "@/layouts/default";
import { Drawer, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter, Button, Divider, Spinner } from "@heroui/react";
import { CardGarment } from "@/components/card-garment";
import { Garment } from "@/types/garment";
import { User } from "@/types/user";
import { useUser } from "@/store/user";
import confetti from 'canvas-confetti'

type GarmentWithQty = { garment: Garment; quantity: number };

export default function CartPage() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [cartItems, setCartItems] = useState<GarmentWithQty[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const user: User = useUser((state) => state.user);
    const loading = useUser((state) => state.loading);

    const groupCart = (items: Garment[]): GarmentWithQty[] => {
        const grouped: { [key: string]: GarmentWithQty } = {};

        for (const item of items) {
            const key = `${item.name}-${item.size}-${JSON.stringify(item.colors)}`;
            if (grouped[key]) {
                grouped[key].quantity += 1;
            } else {
                grouped[key] = { garment: item, quantity: 1 };
            }
        }

        return Object.values(grouped);
    };

    const ungroupCart = (items: GarmentWithQty[]): Garment[] => {
        return items.flatMap(({ garment, quantity }) => Array(quantity).fill(garment));
    };

    const loadCartFromStorage = () => {
        const cartJSON = localStorage.getItem("cart");
        const rawItems: Garment[] = cartJSON ? JSON.parse(cartJSON) : [];
        const groupedItems = groupCart(rawItems);
        setCartItems(groupedItems);
        updateTotal(groupedItems);
    };

    const updateTotal = (items: GarmentWithQty[]) => {
        const total = items.reduce((acc, item) => acc + (item.garment.price || 0) * item.quantity, 0);
        setTotalPrice(total);
    };

    const updateCart = (newItems: GarmentWithQty[]) => {
        setCartItems(newItems);
        localStorage.setItem("cart", JSON.stringify(ungroupCart(newItems)));
        updateTotal(newItems);
    };

    const changeQuantity = (index: number, delta: number) => {
        const updated = [...cartItems];
        const newQty = updated[index].quantity + delta;
        if (newQty < 1) return;
        updated[index].quantity = newQty;
        updateCart(updated);
    };

    const removeItem = (index: number) => {
        const updated = [...cartItems];
        updated.splice(index, 1);
        updateCart(updated);
    };

    const makeOrder = () => {
        confetti({
            particleCount: 250,
            startVelocity: 30,
            spread: 360,
            origin: { y: 0.3 }
            
        });
    };

    useEffect(() => {
        loadCartFromStorage();
    }, []);

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
                    {cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0)} item{cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0) !== 1 && "s"} in the cart
                </div>

                <div className="text-lg font-semibold mb-6 text-secondary">Total: {totalPrice.toFixed(2)} €</div>

                {cartItems.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
                        {cartItems.map(({ garment, quantity }, index) => (
                            <div key={index} className="flex flex-col gap-2">
                                <CardGarment garment={garment} />
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Button size="sm" variant="light" onPress={() => changeQuantity(index, -1)}>
                                            −
                                        </Button>
                                        <span className="font-medium">{quantity}</span>
                                        <Button size="sm" variant="light" onPress={() => changeQuantity(index, 1)}>
                                            +
                                        </Button>
                                    </div>
                                    <Button size="sm" variant="light" color="danger" onPress={() => removeItem(index)}>
                                        Remove
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">Your cart is empty.</p>
                )}

                {cartItems.length > 0 && (
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
