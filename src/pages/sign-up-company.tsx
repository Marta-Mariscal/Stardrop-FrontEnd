import { useNavigate } from "react-router-dom";

// Assets
import logo from "../../assets/img/stardrop-logo.png";

// Components
import { title } from "@/components/primitives";

// HeroUI
import { Form } from "@heroui/form";
import { Input, Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { addToast } from "@heroui/toast";

// Types
import type { User } from "@/types/user";

// Store
import { useUser } from "@/store/user";

export default function SignUpCompanyPage() {
    const navigate = useNavigate();
    const loading = useUser((state) => state.loading);
    const error = useUser((state) => state.error);
    const signUp = useUser((state) => state.signUp);

    const onSuccessHandler = () => {
        addToast({
            title: "Signed up successfully",
            description: "Welcome to Stardrop! 🌟",
            color: "success"
        });

        navigate('/', { replace: true });
    }

    const onErrorHandler = () => {
        addToast({
            title: "SignUp failed",
            description: error?.message || "Please try again later.",
            color: "danger"
        });
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        let data = Object.fromEntries(new FormData(e.currentTarget)) as unknown as User;
        data.type = "company";

        signUp(data, { onSuccess: onSuccessHandler, onError: onErrorHandler });
    };

    const backLoginHandler = () => {
        navigate('/login', { replace: true })
    };

    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <div className="inline-block max-w-lg text-center justify-center">
                <h1 className={title()}>Sign Up as Company</h1>
                <img src={logo} alt="Logo" className="w-16 h-16 mx-auto mb-4" />
                <p className="text-default-500">Create a new account for company</p>
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
                            errorMessage="Please enter a name"
                            label="Name"
                            labelPlacement="inside"
                            name="name"
                            placeholder="Stardrop"
                            type="text"
                        />
                        <Input
                            isRequired
                            errorMessage="Please enter a address"
                            label="Address"
                            labelPlacement="inside"
                            name="address"
                            placeholder="C/Street 123"
                            type="text"
                        />
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
                            placeholder="sercretpassword"
                            type="password"
                        />
                        <Textarea
                            isRequired
                            label="Description"
                            labelPlacement="inside"
                            placeholder="This is Stardrop Company!"
                            errorMessage="Please enter a description"
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

                        {/* TODO: subir icon input type file  */}

                        <div className="flex gap-2">
                            <Button color="secondary" type="submit" isLoading={loading}>
                                Sign Up
                            </Button>
                            <Button color="secondary" type="reset" variant="flat" onPress={backLoginHandler}>
                                I already have an account
                            </Button>
                        </div>
                        <div>
                            <Link color="secondary" href="/sign-up">
                                Sign Up as customer 
                            </Link>
                        </div>
                    </Form>
                </div>
            </div>
        </section>
    );
}
