import { CardGarment } from "@/components/card-garment";
import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { useCart } from "@/store/cart";

export default function CartPage() {
    const garmentsCart = useCart((state) => state.cart);
    const loading = useCart((state) => state.loading);

    return (
        <DefaultLayout>
            <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
                <div className="inline-block max-w-lg text-center justify-center">
                    <h1 className={title()}>cart</h1>
                </div>
            </section>

            {!loading && !garmentsCart?.length && (
                <div className="text-center mt-4">
                    <p className="text-lg font-bold">No garments on cart</p>
                    <p className="text-sm text-gray-500">Keep shopping!</p>
                </div>
            )}

            {!loading && garmentsCart?.length && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4">
                    {garmentsCart.map((garment) => (
                        <CardGarment key={garment._id} garment={garment} />
                    ))}
                </div>
            )}
        </DefaultLayout>

        
    );
}
