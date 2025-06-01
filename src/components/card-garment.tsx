import { type Garment } from "@/types/garment";
import { Card, CardHeader, CardBody, Image } from "@heroui/react";
import { useNavigate } from "react-router-dom";

interface CardGarmentProps {
    garment: Garment;
}

export const CardGarment = ({ garment }: CardGarmentProps) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/garment/${garment._id}`);
    };

    return (
        <>
            {garment.type == "new" ? (
                <button
                    type="button"
                    onClick={handleClick}
                    className="w-full text-left bg-transparent border-none p-0 m-0 cursor-pointer"
                    aria-label={`View details for ${garment.name}`}
                >
                    <Card className="py-4">
                        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                            <p className="text-tiny uppercase font-bold">{garment?.owner?.name}</p>
                            <small className="text-default-500">{garment.price}€</small>
                            <h4 className="font-bold text-large">{garment.name}</h4>
                        </CardHeader>
                        <CardBody className="overflow-visible py-2">
                            <Image
                                alt="Card background"
                                className="w-full h-auto object-cover rounded-xl"
                                src="https://heroui.com/images/hero-card-complete.jpeg"
                            />

                        </CardBody>
                    </Card>
                </button>
            ) : (
                <button
                    type="button"
                    onClick={handleClick}
                    className="w-full text-left bg-transparent border-none p-0 m-0 cursor-pointer"
                    aria-label={`View details for ${garment.name}`}
                >
                    <Card className="py-4">
                        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                            <p className="text-tiny uppercase font-bold">{garment?.owner?.name}</p>
                            <p className="text-tiny text-danger">{garment.price}€</p>
                            <h4 className="font-bold text-large">{garment.name}</h4>
                        </CardHeader>
                        <CardBody className="overflow-visible py-2">
                            <Image
                                alt="Card background"
                                className="w-full h-auto object-cover rounded-xl"
                                src="https://heroui.com/images/hero-card-complete.jpeg"
                            />


                        </CardBody>
                    </Card>
                </button>
            )}


        </>
    );

};
