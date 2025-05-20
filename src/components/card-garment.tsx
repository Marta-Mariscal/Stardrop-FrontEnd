import { type Garment } from "@/types/garment";
import { Card, CardHeader, CardBody, Image } from "@heroui/react";
import { useNavigate } from "react-router-dom";

interface CardGarmentProps {
    garment: Garment;
}

export const CardGarment = ({ garment }: CardGarmentProps) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/garmentpage/${garment._id}`);
    };
    return (
        <div onClick={handleClick}>
            <Card className="py-4">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <p className="text-tiny uppercase font-bold">{garment?.owner?.name}</p>
                    <small className="text-default-500">{garment.price}€</small>
                    <h4 className="font-bold text-large">{garment.name}</h4>
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                    <Image alt="Card background" className="object-cover rounded-xl" src="https://heroui.com/images/hero-card-complete.jpeg" width={270} />
                </CardBody>
            </Card>
        </div>
    );
};
