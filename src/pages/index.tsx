import DefaultLayout from "@/layouts/default";

// Store
import { useUser } from "@/store/user";

export default function IndexPage() {
    const user = useUser(state => state.user);

    return (
        <DefaultLayout>
            <h1>Hi!👋 {user?.name || 'Stardrop'}</h1>
        </DefaultLayout>
    );
}
