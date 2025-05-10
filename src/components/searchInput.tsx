// Hero UI
import { Input } from "@heroui/input";

// Icons
import { SearchIcon } from "@/components/icons";

interface SearchInputProps {
    value?: string;
    label?: string;
    placeholder?: string;
    fullWidth?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onValueChange?: (value: string) => void;
    onClear?: () => void;
}

export const SearchInput = ({ value, label, placeholder, fullWidth, onChange, onValueChange, onClear }: SearchInputProps) => {
    return (
        <Input
            isClearable
            value={value}
            label={label}
            aria-label="Search"
            classNames={{
                label: "text-black/50 dark:text-white/90",
                input: ["bg-transparent", "text-black/90 dark:text-white/90", "placeholder:text-default-700/50 dark:placeholder:text-white/60"],
                innerWrapper: "bg-transparent",
                inputWrapper: [
                    "bg-default-200/50",
                    "dark:bg-default/60",
                    "backdrop-blur-xl",
                    "backdrop-saturate-200",
                    "hover:bg-default-200/70",
                    "dark:hover:bg-default/70",
                    "group-data-[focus=true]:bg-default-200/50",
                    "dark:group-data-[focus=true]:bg-default/60",
                    "!cursor-text"
                ]
            }}
            fullWidth={fullWidth}
            radius="lg"
            placeholder={placeholder || "Search..."}
            startContent={<SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />}
            type="search"
            onChange={onChange}
            onValueChange={onValueChange}
            onClear={onClear}
        />
    );
};
