import { useNavigate } from "react-router-dom";
import CredentialLayout from "@/layouts/credential";
import logo from "../../assets/img/stardrop-logo.png";
import { Form, Input, Button, Link, addToast, Image, Textarea } from "@heroui/react";
import type { User } from "@/types/user";
import { useUser } from "@/store/user";
import { ImageInput } from "@/components/image-input";

export default function SignUpPage() {
    const navigate = useNavigate();
    const loading = useUser((state) => state.loading);
    const signUp = useUser((state) => state.signUp);

    const onSuccessHandler = () => {
        addToast({
            title: "Signed up successfully",
            description: "Welcome to Stardrop! 🌟",
            color: "success"
        });

        navigate("/", { replace: true });
    };

    const onErrorHandler = (error: Error) => {
        addToast({
            title: "SignUp failed",
            description: error?.message || "Please try again later.",
            color: "danger"
        });
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        let data = Object.fromEntries(new FormData(e.currentTarget)) as unknown as User;
        data.type = "customer";

        signUp(data, { onSuccess: onSuccessHandler, onError: onErrorHandler });
    };

    const backLoginHandler = () => {
        navigate("/login", { replace: true });
    };

    return (
        <CredentialLayout>
            <div className="flex justify-center pt-5">
                <div className="w-full max-w-md bg-purple-300 rounded-2xl shadow-lg p-8 flex flex-col items-center">
                    <div className="flex items-center gap-4 mb-4">
                        <Image src={logo} alt="Logo" className="w-14 h-14" radius="none" />
                        <div>
                            <h1 className="text-3xl font-semibold text-gray-800">Sign Up</h1>
                            <p className="text-gray-500 text-sm">Create a new account</p>
                        </div>
                    </div>

                    <Form className="w-full flex flex-col gap-4" onSubmit={onSubmitHandler}>
                        <Input
                            isRequired
                            errorMessage="Please enter a valid email"
                            label="Email"
                            labelPlacement="inside"
                            name="email"
                            placeholder="example@stardrop.com"
                            type="email"
                        />
                        <Input isRequired errorMessage="Please enter a name" label="Name" labelPlacement="inside" name="name" placeholder="Stardrop" type="text" />
                        <Input isRequired errorMessage="Please enter an address" label="Address" labelPlacement="inside" name="address" placeholder="C/Street 123" type="text" />
                        <Input
                            isRequired
                            errorMessage="Please enter a valid phone number"
                            label="Phone Number"
                            labelPlacement="inside"
                            name="phone"
                            placeholder="999999999"
                            type="number"
                        />
                        <Input
                            isRequired
                            errorMessage="Please enter a password"
                            label="Password"
                            labelPlacement="inside"
                            name="password"
                            placeholder="secretpassword"
                            type="password"
                        />
                        <Textarea
                            isRequired
                            label="Description"
                            labelPlacement="inside"
                            placeholder="This is Stardrop Company!"
                            errorMessage="Please enter a description"
                            name="description"
                        />
                        <Input
                            isRequired
                            errorMessage="Please enter your website"
                            label="Website"
                            labelPlacement="inside"
                            name="website"
                            placeholder="www.stardrop.com"
                            type="url"
                        />

                        {/* TODO: subir icon input type file */}

                        <div className="flex gap-2 justify-center pt-2">
                            <Button color="secondary" type="submit" isLoading={loading}>
                                Sign Up
                            </Button>
                            <Button color="secondary" type="reset" variant="flat" onPress={backLoginHandler}>
                                I already have an account
                            </Button>
                        </div>

                        <div className="pt-2 text-center">
                            <Link color="secondary" href="/sign-up">
                                Sign Up as customer
                            </Link>
                        </div>
                    </Form>
                </div>
            </div>
        </CredentialLayout>
    );
}
