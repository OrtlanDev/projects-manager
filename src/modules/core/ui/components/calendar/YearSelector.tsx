import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/modules/core/ui/components/shadcn/select";

interface YearSelectorProps {
    currentYear: number;
    selectedYear: number;
    onYearChange: (newYear: number) => void;
}

const currentYear = new Date().getFullYear();

const generateYearOptions = () => {
    return Array.from({ length: 11 }, (_, i) => currentYear + i);
};

const YearSelector = ({ selectedYear, onYearChange }: YearSelectorProps) => {
    return (
        <Select value={String(selectedYear)} onValueChange={(value) => onYearChange(Number(value))}>
            <SelectTrigger className="h-8 w-max font-medium">
                <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-[min(26rem,var(--radix-select-content-available-height))]">
                {generateYearOptions().map((year) => (
                    <SelectItem key={year} value={String(year)}>
                        {year}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default YearSelector;
