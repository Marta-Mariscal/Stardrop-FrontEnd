import { useState } from "react";

// Assets
import logo from "../../assets/img/stardrop-logo.png";

// Components
import { title } from "@/components/primitives";

// HeroUI
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";

// Types
import type { Credential } from "@/types/credential";

export default function DocsPage() {
    const [action, setAction] = useState<Credential>();

    const onResetHandler = () => {
        setAction(null);
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        let data = Object.fromEntries(new FormData(e.currentTarget));

        setAction(data as unknown as Credential);
    };

    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <div className="inline-block max-w-lg text-center justify-center">
                <h1 className={title()}>Login</h1>
                <img src={logo} alt="Logo" className="w-16 h-16 mx-auto mb-4" />
                <p className="text-default-500">Login to your account</p>
                <div className="form-login-container">
                    <Form className="w-full max-w-xs flex flex-col gap-4" onReset={onResetHandler} onSubmit={onSubmitHandler}>
                        <Input
                            isRequired
                            errorMessage="Please enter a valid email"
                            label="Email"
                            labelPlacement="outside"
                            name="email"
                            placeholder="example@stardrop.com"
                            type="email"
                        />
                        <Input
                            isRequired
                            errorMessage="Please enter a password"
                            label="Password"
                            labelPlacement="outside"
                            name="password"
                            placeholder="Enter your password"
                            type="password"
                        />
                        <div className="flex gap-2">
                            <Button color="secondary" type="submit">
                                Login
                            </Button>
                            <Button color="secondary" type="reset" variant="flat">
                                Create an account
                            </Button>
                        </div>

                        
                        

                        {action && (
                            <div className="text-small text-default-500">
                                Action: <code>{JSON.stringify(action)}</code>
                            </div>
                        )}
                        
                    </Form>
                    
                </div>
                
            </div>
        </section>
    );
}
