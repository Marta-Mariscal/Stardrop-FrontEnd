import { type Garment } from "@/types/garment";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";

interface CardGarmentProps {
    garment: Garment;
}

export const CardGarment = ({ garment }: CardGarmentProps) => {
    return (
        <Card className="py-4">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-tiny uppercase font-bold">{ garment?.owner?.name }</p>
                <small className="text-default-500">{ garment.price }€</small>
                <h4 className="font-bold text-large">{ garment.name }</h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
                <img alt="Card background" className="object-cover rounded-xl" src="https://heroui.com/images/hero-card-complete.jpeg" width={270} />
            </CardBody>
        </Card>
    );
};
