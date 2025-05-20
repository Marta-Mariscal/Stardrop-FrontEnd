import DefaultLayout from "@/layouts/default";
import { Garment } from "@/types/garment";
import { useLoaderData } from "react-router-dom";

export default function GarmentPage() {
    const garment = useLoaderData() as Garment;

    return (
        <DefaultLayout>
            <div className="p-6">
            <h1 className="text-2xl font-bold">Garment ID: {garment.name}</h1>
        </div>
        </DefaultLayout>
    );
}
