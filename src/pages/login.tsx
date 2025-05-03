import { useNavigate } from "react-router-dom";

// Assets
import logo from "../../assets/img/stardrop-logo.png";

// Components
import { title } from "@/components/primitives";

// HeroUI
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";

// Types
import type { Credential } from "@/types/credential";

// Stores
import { useUser } from "@/store/user";

export default function LoginPage() {
    const navigate = useNavigate();
    const loading = useUser(state => state.loading);
    const error = useUser(state => state.error);
    const login = useUser(state => state.login);

    const onSuccessHandler = () => {
        addToast({
            title: "Logged in successfully",
            description: "Welcome back! 😊",
            color: "success"
        });

        navigate('/', { replace: true });
    }

    const onErrorHandler = () => {
        addToast({
            title: "Login failed",
            description: error?.message || "Please try again later.",
            color: "danger"
        });
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        let data = Object.fromEntries(new FormData(e.currentTarget)) as Credential;

        login(data, { onSuccess: onSuccessHandler, onError: onErrorHandler });
    };

    const backSignUpHandler = () => {
        navigate('/sign-up', { replace: true })
    };

    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <div className="inline-block max-w-lg text-center justify-center">
                <h1 className={title()}>Login</h1>
                <img src={logo} alt="Logo" className="w-16 h-16 mx-auto mb-4" />
                <p className="text-default-500">Login to your account</p>
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
                        <div className="flex gap-2">
                            <Button color="secondary" type="submit" isLoading={loading}>
                                Login
                            </Button>
                            <Button color="secondary" type="reset" onPress={backSignUpHandler} variant="flat">
                                Create an account
                            </Button>
                        </div>

                        {/* TODO: subir icon: input type file */}
                    </Form>
                    
                </div>
                
            </div>
        </section>
    );
}
