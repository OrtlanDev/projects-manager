import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/modules/core/ui/components/shadcn/select";

interface MonthSelectorProps {
    selectedMonth: number;
    onMonthChange: (newMonth: number) => void;
}

const MonthSelector = ({ selectedMonth, onMonthChange }: MonthSelectorProps) => {
    return (
        <Select value={String(selectedMonth)} onValueChange={(value) => onMonthChange(Number(value))}>
            <SelectTrigger className="h-8 w-max font-medium">
                <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-[min(26rem,var(--radix-select-content-available-height))]">
                {[...Array(12)].map((_, index) => (
                    <SelectItem key={index} value={String(index)}>
                        {new Date(0, index).toLocaleString("default", { month: "long" })}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default MonthSelector;
