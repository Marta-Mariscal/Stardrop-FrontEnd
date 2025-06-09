import { useNavigate } from "react-router-dom";
import logo from "../../assets/img/stardrop-logo.png";
import { Form, Input, Button, Image, addToast, Spinner } from "@heroui/react";
import type { User } from "@/types/user";
import { useUser } from "@/store/user";
import DefaultLayout from "@/layouts/default";
import { ImageInput } from "@/components/image-input";

export default function FormProfileEditPage() {
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
                        <Image src={logo} alt="Logo" className="w-14 h-14" radius="none"/>
                        <div>
                            <h1 className="text-3xl font-semibold text-gray-800">Edit your account</h1>
                            {/* No agregué subtítulo para que sea igual al ejemplo */}
                        </div>
                    </div>

                    <Form className="w-full flex flex-col gap-4" onSubmit={onSubmitHandler}>
                        <ImageInput image={user?.icon} label="Icon" name="iconBlob" onChange={() => {}}/>
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
                        <Input
                            isRequired
                            errorMessage="Please enter your card number"
                            label="Card Number"
                            labelPlacement="inside"
                            name="cardNumber"
                            placeholder="1111 1111 1111 1111"
                            type="text"
                            defaultValue={user?.cardNumber}
                        />
                        <Input
                            isRequired
                            errorMessage="Please enter your card expiration date"
                            label="Card Expiration Date"
                            labelPlacement="inside"
                            name="cardExpirationDate"
                            placeholder="MM/YY"
                            type="text"
                            defaultValue={user?.cardExpirationDate}
                        />
                        <Input
                            isRequired
                            errorMessage="Please enter your card name"
                            label="Card Name"
                            labelPlacement="inside"
                            name="cardHolderName"
                            placeholder="STARDROP EXAMPLE"
                            type="text"
                            defaultValue={user?.cardHolderName}
                        />
                        <Input
                            isRequired
                            errorMessage="Please enter your card CVV"
                            label="Card CVV"
                            labelPlacement="inside"
                            name="cardCVV"
                            placeholder="111"
                            type="number"
                            defaultValue={user?.cardCVV}
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
