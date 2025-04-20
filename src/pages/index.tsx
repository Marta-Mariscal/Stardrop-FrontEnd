import DefaultLayout from "@/layouts/default";

// Custom Hooks
import { useUser } from "@/hooks/useUser";

export default function IndexPage() {
    const { user } = useUser();

    return (
        <DefaultLayout>
            <h1>Hi!👋 {user?.name || 'Stardrop'}</h1>
        </DefaultLayout>
    );
}
