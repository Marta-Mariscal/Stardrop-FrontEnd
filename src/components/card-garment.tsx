import { type Garment } from "@/types/garment";
import { Card, CardHeader, CardBody, Image, Chip } from "@heroui/react";
import { useNavigate } from "react-router-dom";

type ChipColor = "default" | "primary" | "secondary" | "success" | "warning" | "danger";

interface CardGarmentProps {
    garment: Garment;
    chips?: { label: string; color?: ChipColor }[];
}

export const CardGarment = ({ garment, chips }: CardGarmentProps) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/garment/${garment._id}`);
    };

    return (
        <>
            <button
                type="button"
                onClick={handleClick}
                className="w-full text-left bg-transparent border-none p-0 m-0 cursor-pointer"
                aria-label={`View details for ${garment.name}`}
            >
                <Card className="py-4">
                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                        <p className="text-tiny uppercase font-bold">{garment?.owner?.name}</p>
                        {garment.type == "new" ? <small className="text-default-500">{garment.price}€</small> : <p className="text-tiny text-danger">{garment.price}€</p>}
                        <h4 className="font-bold text-large">{garment.name}</h4>
                    </CardHeader>
                    <CardBody className="overflow-visible py-2">
                        <Image
                            alt="Card background"
                            className="w-full h-auto object-cover rounded-xl"
                            src="https://heroui.com/images/hero-card-complete.jpeg"
                        />

                    </CardBody>
                    {chips && (
                        <div className="flex flex-wrap gap-2 px-4 py-2">
                            {chips.map((chip, index) => (
                                <Chip key={index} color={chip.color || "default"}>{chip.label}</Chip>
                            ))}
                        </div>
                    )}
                </Card>
            </button>
        </>
    );

};
