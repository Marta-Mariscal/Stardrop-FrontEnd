import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import DefaultLayout from "@/layouts/default";
import { Garment } from "@/types/garment";
import { Image, Button, Chip, Divider, addToast } from "@heroui/react";
import { HeartFilledIcon } from "@/components/icons";

const sizeOptions: Record<string, string[]> = {
    shirt: ["XS", "S", "M", "L", "XL"],
    pant: ["30", "32", "34", "36", "38", "40"],
    dress: ["XS", "S", "M", "L"],
    outerwear: ["S", "M", "L", "XL", "XXL"],
    accessory: ["One Size"],
    other: ["S", "M", "L"],
    footwear: ["36", "37", "38", "39", "40", "41", "42"]
};

export default function GarmentPage() {
    const garment = useLoaderData() as Garment;

    const [selectedSize, setSelectedSize] = useState("");
    const [error, setError] = useState("");

    const sizes = sizeOptions[garment.category];

    const handleAddToCart = () => {
        if (!selectedSize) {
            setError("Please select a size");
            addToast({
                title: "Error",
                description: "Select a size to add to cart.",
                color: "danger"
            });
            return;
        }
        setError("");

        const cartJSON = localStorage.getItem("cart");
        const cart: (Garment & { selectedSize: string })[] = cartJSON ? JSON.parse(cartJSON) : [];

        const garmentToAdd = { ...garment, selectedSize };
        cart.push(garmentToAdd);

        localStorage.setItem("cart", JSON.stringify(cart));

        addToast({
            title: "Added to cart",
            description: `You have ${garment.name} (size ${selectedSize}) to cart.`,
            color: "success"
        });

        setSelectedSize("");
    };

    return (
        <DefaultLayout>
            <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex justify-center items-center">
                    <Image src={garment.image || "https://heroui.com/images/hero-card-complete.jpeg"} alt={garment.name} className="rounded-lg w-full h-auto object-cover" />
                </div>

                <div className="flex flex-col justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">{garment.name}</h1>
                        <p className="text-gray-600 mb-4">{garment.description}</p>

                        <div className="flex flex-wrap items-center gap-2 mb-4">
                            <Chip color="secondary">{garment.category}</Chip>
                            <Chip color="default">{garment.gender}</Chip>
                        </div>

                        <div className="flex items-center gap-2 mb-4">
                            {garment.colors.map((color) => (
                                <span key={color} className="w-6 h-6 rounded-full border border-gray-300" style={{ backgroundColor: color }}></span>
                            ))}
                        </div>

                        <h2 className="text-2xl font-semibold text-secondary mb-4">{garment.price.toFixed(2)} €</h2>

                        {sizes.length > 0 && (
                            <div className="mb-4">
                                <p className="mb-2 font-medium text-sm text-gray-700">Select a size:</p>
                                <div className="flex flex-wrap gap-2 mb-1">
                                    {sizes.map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
                                                selectedSize === size ? "bg-secondary text-white border-secondary" : "bg-white text-gray-700 border-gray-300 hover:border-secondary"
                                            }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                                {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
                            </div>
                        )}

                        <div className="flex gap-4">
                            <Button color="secondary" variant="solid" onPress={handleAddToCart} disabled={!selectedSize}>
                                Add to cart
                            </Button>
                            <Button
                                color="secondary"
                                as={Link}
                                className="text-sm font-normal text-default-600 bg-default-100"
                                startContent={<HeartFilledIcon className="text-secondary" />}
                                variant="bordered"
                            ></Button>
                        </div>
                    </div>

                    {garment.owner && (
                        <div className="mt-6">
                            <Divider />
                            <p className="text-sm text-gray-500 mt-2">
                                Sold by: <span className="font-medium">{garment.owner.name}</span>
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </DefaultLayout>
    );
}
