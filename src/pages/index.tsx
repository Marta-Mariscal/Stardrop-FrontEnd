import DefaultLayout from "@/layouts/default";

// Store
import { useUser } from "@/store/user";

// Custom Components
import { SearchInput } from "@/components/searchInput";

export default function IndexPage() {
    const user = useUser(state => state.user);

    return (
        <DefaultLayout>
            <div className="flex flex-col items-center justify-center">
                <div className="text-2xl font-bold mb-4">
                    Welcome to Stardrop, {user?.name || "Guest"}! 👋🏼
                </div>
                <SearchInput />
                
            </div>
        </DefaultLayout>
    );
}
