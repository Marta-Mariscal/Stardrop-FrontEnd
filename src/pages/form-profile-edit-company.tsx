import { useNavigate } from "react-router-dom";
import logo from "../../assets/img/stardrop-logo.png";
import { Form, Input, Button, Image, addToast, Spinner, Textarea } from "@heroui/react";
import type { User } from "@/types/user";
import { useUser } from "@/store/user";
import DefaultLayout from "@/layouts/default";
import { ImageInput } from "@/components/image-input";

export default function FormProfileEditCompanyPage() {
    const navigate = useNavigate();
    const loading = useUser((state) => state.loading);
    const update = useUser((state) => state.update);
    const user = useUser((state) => state.user);

    const onSuccessHandler = () => {
        addToast({
            title: "User updated",
            description: "Your user has been successfully updated! 🎉",
            color: "success"
        });

        navigate("/profile", { replace: true });
    };

    const onErrorHandler = (error: Error) => {
        addToast({
            title: "Update user failed",
            description: error?.message || "Please try again later.",
            color: "danger"
        });
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        let data = Object.fromEntries(new FormData(e.currentTarget)) as unknown as User;

        Object.keys(data).forEach((key) => {
            if (data[key] === user[key] || (key === "password" && !data[key]) || (key === "iconBlob" && (!data[key].name || data[key].name.includes(user.icon)))) {
                delete data[key];
            } else if (data[key] === "" || data[key] === null) {
                data[key] = user[key];
            }
        });

        update(data, { onSuccess: onSuccessHandler, onError: onErrorHandler });
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
                        <Image src={logo} alt="Logo" className="w-14 h-14" radius="none" />
                        <div>
                            <h1 className="text-3xl font-semibold text-gray-800">Edit your company account</h1>
                        </div>
                    </div>

                    <Form className="w-full flex flex-col gap-4" onSubmit={onSubmitHandler}>
                        <ImageInput image={user?.icon} label="Icon" name="iconBlob" onChange={() => { }} />
                        <Input
                            isRequired
                            errorMessage="Please enter a valid email"
                            label="Email"
                            labelPlacement="inside"
                            name="email"
                            placeholder="example@stardrop.com"
                            type="email"
                            defaultValue={user?.email}
                        />
                        <Input
                            isRequired
                            errorMessage="Please enter a name"
                            label="Name"
                            labelPlacement="inside"
                            name="name"
                            placeholder="Stardrop"
                            type="text"
                            defaultValue={user?.name}
                        />
                        <Input
                            isRequired
                            errorMessage="Please enter an address"
                            label="Address"
                            labelPlacement="inside"
                            name="address"
                            placeholder="C/Street 123"
                            type="text"
                            defaultValue={user?.address}
                        />
                        <Input
                            isRequired
                            errorMessage="Please enter a valid phone number"
                            label="Phone Number"
                            labelPlacement="inside"
                            name="phone"
                            placeholder="999999999"
                            type="number"
                            defaultValue={user?.phone}
                        />
                        <Input
                            errorMessage="Please enter a new password"
                            label="Password"
                            labelPlacement="inside"
                            name="password"
                            placeholder="Reset your password"
                            type="password"
                        />
                        <Textarea
                            isRequired
                            label="Description"
                            labelPlacement="inside"
                            placeholder="This is Stardrop Company!"
                            errorMessage="Please enter a description"
                            name="description"
                            defaultValue={user?.description}
                        />
                        <Input
                            isRequired
                            errorMessage="Please enter your website"
                            label="Website"
                            labelPlacement="inside"
                            name="website"
                            placeholder="www.stardrop.com"
                            type="url"
                            defaultValue={user?.web}
                        />

                        <div className="flex justify-between w-full pt-2">
                            <Button color="secondary" type="submit" isLoading={loading}>
                                Update
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
