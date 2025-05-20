import { useNavigate } from "react-router-dom";
import logo from "../../assets/img/stardrop-logo.png";
import { title } from "@/components/primitives";
import { Form, Input, Button, Image, addToast } from "@heroui/react";
import type { User } from "@/types/user";
import { useUser } from "@/store/user";
import DefaultLayout from "@/layouts/default";

export default function FormPostGarmentPage() {
    const loading = useUser((state) => state.loading);
    const navigate = useNavigate();
    const update = useUser((state) => state.update);
    const user = useUser((state) => state.user);

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

    const onSubmitHandler = (e) => {
        e.preventDefault();
        let data = Object.fromEntries(new FormData(e.currentTarget)) as unknown as User;
        data.type = "customer";

        update(data, { onSuccess: onSuccessHandler, onError: onErrorHandler });
    };

    return (
        <DefaultLayout>
            <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
                <div className="inline-block max-w-lg text-center justify-center">
                    <h1 className={title()}>Post new garment!</h1>
                    <Image src={logo} alt="Logo" className="w-16 h-16 mx-auto mb-4" />
                    <div className="form-login-container">
                        <Form className="w-full max-w-xs flex flex-col gap-4" onSubmit={onSubmitHandler}>
                            <Input
                                isRequired
                                errorMessage="Please enter a valid email"
                                label="Email"
                                labelPlacement="inside"
                                name="email"
                                placeholder="example@stardrop.com"
                                type="email"
                                defaultValue={user.email}
                            />
                            <Input isRequired errorMessage="Please enter a name" label="Name" labelPlacement="inside" name="name" placeholder="Stardrop" type="text" defaultValue={user.name} />
                            <Input isRequired errorMessage="Please enter a address" label="Address" labelPlacement="inside" name="address" placeholder="C/Street 123" type="text" defaultValue={user.address} />
                            <Input
                                isRequired
                                errorMessage="Please enter a valid phone number"
                                label="Phone Number"
                                labelPlacement="inside"
                                name="phone"
                                placeholder="999999999"
                                type="number"
                                defaultValue={user.phone}
                            />
                            <Input
                                isRequired
                                errorMessage="Please enter a new password"
                                label="Password"
                                labelPlacement="inside"
                                name="password"
                                placeholder="secretpassword"
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
                                defaultValue={user.cardNumber}
                            />
                            <Input
                                isRequired
                                errorMessage="Please enter your card expiration date"
                                label="Card Expiration Date"
                                labelPlacement="inside"
                                name="cardExpirationDate"
                                placeholder="MM/YY"
                                type="text"
                                defaultValue={user.cardExpirationDate}
                            />
                            <Input
                                isRequired
                                errorMessage="Please enter your card name"
                                label="Card Name"
                                labelPlacement="inside"
                                name="cardName"
                                placeholder="STARDROP EXAMPLE"
                                type="text"
                                defaultValue={user.cardHolderName}
                            />
                            <Input isRequired errorMessage="Please enter your card CVV" label="Card CVV" labelPlacement="inside" name="cardCVV" placeholder="111" type="number" defaultValue={user.cardCVV}/>

                            {/* TODO: subir icon input type file  */}
                            <Button color="secondary" type="submit" isLoading={loading}>
                                Update
                            </Button>
                        </Form>
                    </div>
                </div>
            </section>
        </DefaultLayout>
    );
}
