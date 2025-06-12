import { useState } from "react";
import { Image, Input } from "@heroui/react";
import defaultImage from "../../assets/img/icon-default.png";

interface ImageInputProps {
    image?: string;
    label?: string;
    name?: string;
    placeholder?: string;
    errorMessage?: string;
    onChange?: (value: { file: File; preview: string; clear: () => void }) => void;
}

export const ImageInput = ({ image, label, name, placeholder, errorMessage, onChange }: ImageInputProps) => {
    const [file, setFile] = useState(image ? { preview: image } : null);

    const imageOnChangeHandler = (event) => {
        const eventFile = event.target.files[0];
        setFile({
            preview: URL.createObjectURL(eventFile)
        });
        onChange({
            file: eventFile,
            preview: URL.createObjectURL(eventFile),
            clear: () => {
                setFile(null);
            }
        });
    };

    return (
        <div className="flex flex-col items-center gap-2 w-full mt-1">
            <Input
                errorMessage={errorMessage || "Invalid image! Please upload a valid image file."}
                label={label || "Image"}
                labelPlacement="inside"
                name={name || "image"}
                placeholder={placeholder || "Upload your image!"}
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={imageOnChangeHandler}
            />
            <Image src={file?.preview || defaultImage} alt={label || "Image"} className="w-60" />
        </div>
    );
};
