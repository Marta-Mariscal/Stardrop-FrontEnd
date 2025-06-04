import { useState } from "react";
import { useGarments } from "@/store/garments";
import { Drawer, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter, Button, useDisclosure, Divider } from "@heroui/react";
import { CheckboxGroup, Checkbox } from "@heroui/react";
import { GarmentServiceParams } from "@/types/garment-service-params";

interface CheckboxOption {
    label: string;
    value: string;
    default?: boolean;
}

interface CheckboxOptions {
    label: string;
    value: string;
    type?: string;
    options?: CheckboxOption[];
}

interface FilterGarmentsProps {
    colors: CheckboxOptions;
    genders: CheckboxOptions;
    categories: CheckboxOptions;
    price: {
        label: string;
        value: string;
        type: string;
        min: number;
        max: number;
    };
}

const filtersProps: FilterGarmentsProps = {
    colors: {
        label: "Colors",
        value: "colors",
        type: "checkbox",
        options: [
            { label: "Red", value: "red" },
            { label: "Pink", value: "pink" },
            { label: "Purple", value: "purple" },
            { label: "Blue", value: "blue" },
            { label: "Green", value: "green" },
            { label: "Yellow", value: "yellow" },
            { label: "Orange", value: "orange" },
            { label: "Brown", value: "brown" },
            { label: "Black", value: "black" },
            { label: "White", value: "white" }
        ]
    },
    genders: {
        label: "Genders",
        value: "genders",
        type: "checkbox",
        options: [
            { label: "Man", value: "man" },
            { label: "Woman", value: "woman" },
            { label: "Unisex", value: "unisex" },
            { label: "Child", value: "child" }
        ]
    },
    categories: {
        label: "Categories",
        value: "categories",
        type: "checkbox",
        options: [
            { label: "Shirt", value: "shirt" },
            { label: "Pant", value: "pant" },
            { label: "Dress", value: "dress" },
            { label: "Outerwear", value: "outerwear" },
            { label: "Accessory", value: "accessory" },
            { label: "Other", value: "other" },
            { label: "Footwear", value: "footwear" }
        ]
    },
    price: {
        label: "Price",
        value: "price",
        type: "range",
        min: 0,
        max: 1000
    }
};

export const FilterGarments = () => {
    const [filters, setFilters] = useState<GarmentServiceParams>({});
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const getGarments = useGarments((state) => state.getGarments);

    const setValueByKey = (key: string, value: any) => {
        if (value === null) {
            setFilters((prev) => {
                const newValue = { ...prev };
                delete newValue[key];
                return newValue;
            });
            return;
        }
        setFilters((prev) => ({
            ...prev,
            [key]: value
        }));
    };

    const onCheckboxValueChange = (filter) => {
        return (val) => {
            if (val.length === 0) setValueByKey(filter.value, null);
            else setValueByKey(filter.value, val);
        };
    };

    const onApplyHandler = () => {
        getGarments(filters);
        onClose();
    };

    return (
        <>
            <Button variant="flat" color="secondary" onPress={onOpen}>Filters</Button>
            <Drawer isDismissable={false} isKeyboardDismissDisabled={true} isOpen={isOpen} onOpenChange={onOpenChange}>
                <DrawerContent>
                    {
                        <>
                            <DrawerHeader className="flex flex-col gap-1">Garment filters</DrawerHeader>
                            <DrawerBody>
                                {Object.values(filtersProps).map((filter) => {
                                    if (filter.type === "checkbox") {
                                        return (
                                            <div key={filter.value}>
                                                <CheckboxGroup
                                                    defaultValue={filters[filter.value] || []}
                                                    label={filter.label}
                                                    orientation="horizontal"
                                                    onValueChange={onCheckboxValueChange(filter)}
                                                >
                                                    {filter.options.map((option) => (
                                                        <Checkbox color="secondary" key={option.value} value={option.value}>
                                                            {option.label}
                                                        </Checkbox>
                                                    ))}
                                                </CheckboxGroup>
                                                <Divider className="mt-4"/>
                                            </div>
                                        );
                                    }
                                })}
                            </DrawerBody>
                            <DrawerFooter>
                                <Button color="secondary" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="secondary" onPress={onApplyHandler}>
                                    Apply
                                </Button>
                            </DrawerFooter>
                        </>
                    }
                </DrawerContent>
            </Drawer>
        </>
    );
};
