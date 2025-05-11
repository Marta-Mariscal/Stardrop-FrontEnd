import { useNavigate } from "react-router-dom";
import DefaultLayout from "@/layouts/default";
import { Button } from "@heroui/react";

export default function NotFoundPage() {
    const navigate = useNavigate();

    const goHomepageHandler = () => {
        navigate("/", { replace: true });
    };

    return (
        <DefaultLayout>
            <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-background gap-4">
                <h1 className="text-6xl font-bold text-foreground mb-4">404</h1>
                <p className="text-lg text-default-500 mb-2">Page not found</p>
                <p className="text-sm text-default-400 mb-6">The page you are looking for doesn’t exist or has been moved.</p>
                <Button color="secondary" onPress={goHomepageHandler}>
                    Back to Home
                </Button>
            </section>
        </DefaultLayout>
    );
}
