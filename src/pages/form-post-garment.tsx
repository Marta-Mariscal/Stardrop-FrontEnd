import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/img/stardrop-logo.png";
import { Form, Input, Button, Image, addToast, Textarea, Select, SelectItem, Spinner } from "@heroui/react";
import type { User } from "@/types/user";
import { useUser } from "@/store/user";
import DefaultLayout from "@/layouts/default";
import { sizeOptions } from "@/types/garment-sizes";
import { categoriesGarment } from "@/types/garment-categories";
import { colorsGarment } from "@/types/garment-colors";
import { gendersGarment } from "@/types/garment-genders";
import { statesGarment } from "@/types/garment-status";

export default function FormPostGarmentPage() {
    const loading = useUser((state) => state.loading);
    const navigate = useNavigate();
    const update = useUser((state) => state.update);
    const user = useUser((state) => state.user);

    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const onSuccessHandler = () => {
        addToast({
            title: "Post garment successfully",
            description: "Posted! 🌟",
            color: "success"
        });
        navigate("/", { replace: true });
    };

    const onErrorHandler = (error: Error) => {
        addToast({
            title: "Post garment failed",
            description: error?.message || "Please try again later.",
            color: "danger"
        });
    };

    const goPostGarmentHandler = () => {
        navigate("/form-post-garment", { replace: true });
    };

    const onSubmitHandler = (e) => {
        if (user?.type == "company") {
            e.preventDefault();
            let data = Object.fromEntries(new FormData(e.currentTarget)) as unknown as User;
            data.type = "company";
            update(data, { onSuccess: onSuccessHandler, onError: onErrorHandler });
        } else {
            // TODO: añadir del garment base el genero, colores...
            e.preventDefault();
            let data = Object.fromEntries(new FormData(e.currentTarget)) as unknown as User;
            data.type = "company";
            update(data, { onSuccess: onSuccessHandler, onError: onErrorHandler });
        }

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
            <div className="flex justify-center pt-5">
                <div className="w-full max-w-md bg-purple-300 rounded-2xl shadow-lg p-8 flex flex-col items-center">
                    <div className="flex items-center gap-4 mb-4">
                        <Image src={logo} alt="Logo" className="w-14 h-14" radius="none"/>
                        <div>
                            <h1 className="text-3xl font-semibold text-gray-800">Post Garment</h1>
                            <p className="text-gray-500 text-sm">Create a new garment and post it</p>
                        </div>
                    </div>

                    <Form className="w-full flex flex-col gap-4" onSubmit={onSubmitHandler}>
                        <Input isRequired label="Name" name="name" placeholder="Stardrop" type="text" />
                        <Textarea isRequired label="Description" name="description" placeholder="This dress is in trend!" />
                        <Input isRequired label="Price" name="price" placeholder="19.99€" type="number" />

                        {user?.type == "company" &&
                            <>
                                <Select
                                    label="Category"
                                    placeholder="Select a category"
                                    onSelectionChange={(keys) => {
                                        const keyArray = Array.from(keys);
                                        setSelectedCategory(keyArray.length ? String(keyArray[0]) : null);
                                    }}
                                    name="category"
                                    selectedKeys={selectedCategory ? [selectedCategory] : []}
                                >
                                    {categoriesGarment.map((c) => (
                                        <SelectItem key={c.key}>{c.label}</SelectItem>
                                    ))}
                                </Select>
                                <Select isRequired label="Size" placeholder="Select a size" name="size" isDisabled={!selectedCategory}>
                                    {selectedCategory && sizeOptions[selectedCategory]?.map((size) => <SelectItem key={size}>{size}</SelectItem>)}
                                </Select>

                                <Select label="Colors" placeholder="Select colors" selectionMode="multiple" name="colors">
                                    {colorsGarment.map((c) => (
                                        <SelectItem key={c.key}>{c.label}</SelectItem>
                                    ))}
                                </Select>

                                <Select label="Gender" placeholder="Select a gender" name="gender">
                                    {gendersGarment.map((c) => (
                                        <SelectItem key={c.key}>{c.label}</SelectItem>
                                    ))}
                                </Select>
                            </>
                        }

                        {user?.type == "customer" &&
                            <Select label="Status" placeholder="Select a status" name="status">
                                {statesGarment.map((c) => (
                                    <SelectItem key={c.key}>{c.label}</SelectItem>
                                ))}
                            </Select>
                        }

                        {/* TODO: subir icon input type file */}

                        <div className="flex justify-between w-full pt-2">
                            <Button color="secondary" type="submit" isLoading={loading} onPress={goPostGarmentHandler}>
                                Post Garment
                            </Button>
                            <Button color="danger" variant="flat" type="button" onPress={() => navigate("/profile", { replace: true })}>
                                Cancel
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </DefaultLayout>
    );
}
