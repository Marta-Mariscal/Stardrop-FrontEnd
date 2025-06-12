import { useNavigate } from "react-router-dom";
import CredentialLayout from "@/layouts/credential";
import logo from "../../assets/img/stardrop-logo.png";
import { Form, Input, Button, addToast, Image } from "@heroui/react";
import type { Credential } from "@/types/credential";
import { useUser } from "@/store/user";

export default function LoginPage() {
    const navigate = useNavigate();
    const loading = useUser((state) => state.loading);
    const login = useUser((state) => state.login);

    const onSuccessHandler = () => {
        addToast({
            title: "Logged in successfully",
            description: "Welcome back! 😊",
            color: "success"
        });

        navigate("/", { replace: true });
    };

    const onErrorHandler = (error: Error) => {
        addToast({
            title: "Login failed",
            description: error?.message || "Please try again later.",
            color: "danger"
        });
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        let data = Object.fromEntries(new FormData(e.currentTarget)) as Credential;

        login(data, { onSuccess: onSuccessHandler, onError: onErrorHandler });
    };

    const backSignUpHandler = () => {
        navigate("/sign-up", { replace: true });
    };

    return (
        <CredentialLayout>
            <div className="flex justify-center pt-10">
                <div className="w-full max-w-md bg-purple-300 rounded-2xl shadow-lg p-8 flex flex-col items-center">
                    <div className="flex items-center gap-4 mb-4">
                        <Image src={logo} alt="Logo" className="w-14 h-14" radius="none" />
                        <div>
                            <h1 className="text-3xl font-semibold text-gray-800">Login</h1>
                            <p className="text-gray-500 text-sm">Login to your account</p>
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
                        <Input
                            isRequired
                            errorMessage="Please enter a password"
                            label="Password"
                            labelPlacement="inside"
                            name="password"
                            placeholder="Enter your password"
                            type="password"
                        />
                        <div className="flex gap-2 justify-center pt-2">
                            <Button color="secondary" type="submit" isLoading={loading}>
                                Login
                            </Button>
                            <Button color="secondary" type="reset" onPress={backSignUpHandler} variant="flat">
                                Create Account
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </CredentialLayout>
    );
}
