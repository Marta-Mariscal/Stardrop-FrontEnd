import { useEffect, useState } from "react"
import { useNavigate, useLoaderData } from "react-router-dom"
import logo from "../../assets/img/stardrop-logo.png"
import { Form, Input, Button, Image, addToast, Textarea, Select, SelectItem, Spinner, Chip } from "@heroui/react"
import { type Garment } from "@/types/garment"
import { useUser } from "@/store/user"
import { useGarments } from "@/store/garments"
import DefaultLayout from "@/layouts/default"
import { sizeOptions } from "@/types/garment-sizes"
import { categoriesGarment } from "@/types/garment-categories"
import { colorsGarment } from "@/types/garment-colors"
import { gendersGarment } from "@/types/garment-genders"
import { statesGarment } from "@/types/garment-status"
import { ImageInput } from "@/components/image-input"
import defaultImage from "../../assets/img/icon-default.png"

export default function FormPostGarmentPage() {
    const garment = useLoaderData() as Garment
    const user = useUser((state) => state.user)
    const loading = useUser((state) => state.loading)
    const postGarment = useGarments((state) => state.postGarment)
    const navigate = useNavigate()

    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

    useEffect(() => {
        if (!garment) {
            return
        }

        setSelectedCategory(garment?.category)
    }, [garment])
    const onSuccessHandler = () => {
        addToast({
            title: "Post garment successfully",
            description: "Posted! 🌟",
            color: "success"
        })
        navigate("/", { replace: true })
    }

    const onErrorHandler = (error: Error) => {
        addToast({
            title: "Post garment failed",
            description: error?.message || "Please try again later.",
            color: "danger"
        })
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()
        if (user?.type == "company") {
            onSubmitCompanyHandler(e)
        } else if (user?.type == "customer") {
            onSubmitCustomerHandler(e)
        } else {
            throw new Error("Invalid user type")
        }
    }

    const onSubmitCompanyHandler = (e) => {
        let data = Object.fromEntries(new FormData(e.currentTarget)) as unknown as any
        data.type = "new"
        console.log("Posting garment:", data)
        // postGarment(data, {
        //     onSuccess: onSuccessHandler,
        //     onError: onErrorHandler
        // })
    }

    const onSubmitCustomerHandler = (e) => {
        if (!garment) {
            addToast({
                title: "Cannot post garment",
                description: "No base garment found.",
                color: "danger"
            })
            return
        }

        let data = Object.fromEntries(new FormData(e.currentTarget)) as unknown as Garment
        data.type = "second-hand"
        data.garmentBase = garment._id
        data.category = garment.category
        data.colors = garment.colors
        data.gender = garment.gender

        console.log("Posting garment:", data)
        postGarment(data, {
            onSuccess: onSuccessHandler,
            onError: onErrorHandler
        })
    }

    if (loading) {
        return (
            <DefaultLayout>
                <div className="flex justify-center pt-5">
                    <Spinner color="secondary" label="Loading..." labelColor="secondary" />
                </div>
            </DefaultLayout>
        )
    }

    return (
        <DefaultLayout>
            <div className="flex justify-center pt-5">
                <div className="w-full max-w-md bg-purple-300 rounded-2xl shadow-lg p-8 flex flex-col items-center">
                    <div className="flex items-center gap-4 mb-4">
                        <Image src={logo} alt="Logo" className="w-14 h-14" radius="none" />
                        <div>
                            <h1 className="text-3xl font-semibold text-gray-800">Post Garment</h1>
                            <p className="text-gray-500 text-sm">Create a new garment and post it</p>
                        </div>
                    </div>

                    {garment && (
                        <Input
                            label="Base Garment"
                            labelPlacement="outside"
                            startContent={<Image src={garment?.image || defaultImage} alt="Base garment image" className="w-12 rounded-md object-cover" />}
                            endContent={<Chip color="success">{garment.type}</Chip>}
                            value={garment?.name}
                            className="mb-2"
                            type="text"
                            disabled
                        />
                    )}

                    <Form className="w-full flex flex-col gap-4" onSubmit={onSubmitHandler}>
                        <ImageInput label="Image" name="imageBlob" onChange={() => {}} />
                        <Input isRequired label="Name" name="name" placeholder="Stardrop" type="text" />
                        <Textarea isRequired label="Description" name="description" placeholder="This dress is in trend!" />
                        <Input isRequired label="Price" name="price" placeholder="19.99€" type="number" />
                        <Select
                            label="Category"
                            placeholder="Select a category"
                            onSelectionChange={(keys) => {
                                const keyArray = Array.from(keys)
                                setSelectedCategory(keyArray.length ? String(keyArray[0]) : null)
                            }}
                            name="category"
                            selectedKeys={selectedCategory ? [selectedCategory] : []}
                            isDisabled={user?.type === "customer"}
                            isRequired
                        >
                            {categoriesGarment.map((c) => (
                                <SelectItem key={c.key}>{c.label}</SelectItem>
                            ))}
                        </Select>

                        {user?.type == "customer" && (
                            <>
                                <Select isRequired label="Size" placeholder="Select a size" name="size" isDisabled={!selectedCategory}>
                                    {selectedCategory && sizeOptions[selectedCategory]?.map((size) => <SelectItem key={size}>{size}</SelectItem>)}
                                </Select>
                                <Select label="Status" placeholder="Select a status" name="status" isRequired>
                                    {statesGarment.map((c) => (
                                        <SelectItem key={c.key}>{c.label}</SelectItem>
                                    ))}
                                </Select>
                            </>
                        )}

                        <Select
                            label="Colors"
                            placeholder="Select colors"
                            selectionMode="multiple"
                            name="colors"
                            defaultSelectedKeys={garment?.colors}
                            isDisabled={user?.type === "customer"}
                            isRequired
                        >
                            {colorsGarment.map((c) => (
                                <SelectItem key={c.key}>{c.label}</SelectItem>
                            ))}
                        </Select>

                        <Select
                            label="Gender"
                            placeholder="Select a gender"
                            name="gender"
                            defaultSelectedKeys={garment?.gender ? [garment.gender] : []}
                            isDisabled={user?.type === "customer"}
                            isRequired
                        >
                            {gendersGarment.map((c) => (
                                <SelectItem key={c.key}>{c.label}</SelectItem>
                            ))}
                        </Select>

                        <div className="flex justify-between w-full pt-2">
                            <Button color="secondary" type="submit" isLoading={loading}>
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
    )
}
