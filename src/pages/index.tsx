import { useEffect } from "react";
import DefaultLayout from "@/layouts/default";
import { Spinner, addToast } from "@heroui/react";
import { useUser } from "@/store/user";
import { useGarments } from "@/store/garments";
import { SearchInput } from "@/components/searchInput";
import { CardGarment } from "@/components/card-garment";
import { FilterGarments } from "@/components/filter-garments";

export default function IndexPage() {
    const user = useUser((state) => state.user);
    const garments = useGarments((state) => state.garments);
    const loading = useGarments((state) => state.loading);
    const getGarments = useGarments((state) => state.getNewGarments);

    const onErrorHandler = (error: Error) => {
        addToast({
            title: "Fetching garments failed",
            description: error?.message || "Please try again later.",
            color: "danger"
        });
    };

    useEffect(() => {
        getGarments(null, {
            onError: onErrorHandler
        });
    }, []);

    const onSearchChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        let output = null;
        if (value) output = { search: value };
        getGarments(output, { onError: onErrorHandler });
    };

    const onSearchClearHandler = () => {
        getGarments(null, { onError: onErrorHandler });
    };

    return (
        <DefaultLayout>
            <div className="flex flex-col items-center justify-center">
                <div className="text-2xl font-bold mb-4">Welcome to Stardrop, {user?.name || "Guest"}! 👋🏼</div>
                <div className="w-full flex gap-5">
                    <div className="flex-grow">
                        <SearchInput onChange={onSearchChangeHandler} onClear={onSearchClearHandler} />
                    </div>
                    <div className="whitespace-nowrap">
                        <FilterGarments />
                    </div>
                </div>

                <div className="flex-grow">
                    {loading && <Spinner color="secondary" label="Loading..." labelColor="secondary" />}

                    {!loading && !garments?.length && (
                        <div className="text-center mt-4">
                            <p className="text-lg font-bold">No garments found</p>
                            <p className="text-sm text-gray-500">Try searching for something else</p>
                        </div>
                    )}

                    {!loading && garments?.length && (
                        <>
                            <div className="text-center m-4">
                                <p className="text-lg font-bold">Found {garments.length} garments</p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4">
                                {garments
                                    .filter((g) => g.type == "new")
                                    .map((garment) => (
                                        <CardGarment key={garment._id} garment={garment} />
                                    ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </DefaultLayout>
    );
}
