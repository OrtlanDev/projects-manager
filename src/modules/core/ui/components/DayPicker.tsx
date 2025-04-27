import { Calendar } from "@/modules/core/ui/components/shadcn/calendar";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/modules/core/ui/components/shadcn/select";
import { format } from "date-fns";
import { useState } from "react";

import { Button } from "@/modules/core/ui/components/shadcn/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/modules/core/ui/components/shadcn/popover";
import { CalendarDays } from "lucide-react";

export default function DayPicker() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const currentYear = new Date().getFullYear();

    const handleDateChange = (newYear: number, newMonth: number) => {
        const currentDate = date || new Date();
        const day = currentDate.getDate();

        const newDate = new Date(newYear, newMonth, day);

        if (newDate.getMonth() !== newMonth) {
            newDate.setDate(0);
        }

        setDate(newDate);
    };

    const generateYearOptions = () => {
        return Array.from({ length: 11 }, (_, i) => currentYear + i);
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className="justify-between text-left font-normal">
                    {date ? format(date, "PPP") : "Select a date"}
                    <CalendarDays />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 border-none">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="p-4 rounded-lg border border-border bg-background w-full flex"
                    captionLayout="dropdown"
                    defaultMonth={date}
                    fromDate={new Date()}
                    toDate={new Date(currentYear + 10, 11, 31)}
                    hideNavigation
                    components={{
                        DropdownNav: (props) => <div className="flex absolute max-w-64 gap-2">{props.children}</div>,
                        Dropdown: (props) => {
                            const isYearDropdown = props.options?.some((opt) => Number(opt.value) >= 1000);

                            return (
                                <Select
                                    value={isYearDropdown ? String(date?.getFullYear()) : String(props.value)}
                                    onValueChange={(value) => {
                                        if (props.onChange) {
                                            const event = {
                                                target: { value: String(value) },
                                            } as React.ChangeEvent<HTMLSelectElement>;
                                            props.onChange(event);
                                        }

                                        const numericValue = Number(value);
                                        if (!isNaN(numericValue)) {
                                            if (isYearDropdown) {
                                                handleDateChange(
                                                    numericValue,
                                                    date?.getMonth() || new Date().getMonth()
                                                );
                                            } else {
                                                handleDateChange(
                                                    date?.getFullYear() || new Date().getFullYear(),
                                                    numericValue
                                                );
                                            }
                                        }
                                    }}
                                >
                                    <SelectTrigger className="h-8 w-max font-medium first:w-50">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="max-h-[min(26rem,var(--radix-select-content-available-height))]">
                                        {isYearDropdown
                                            ? generateYearOptions().map((year) => (
                                                  <SelectItem key={year} value={String(year)}>
                                                      {year}
                                                  </SelectItem>
                                              ))
                                            : props.options?.map((option) => (
                                                  <SelectItem
                                                      key={option.value}
                                                      value={String(option.value)}
                                                      disabled={option.disabled}
                                                  >
                                                      {option.label}
                                                  </SelectItem>
                                              ))}
                                    </SelectContent>
                                </Select>
                            );
                        },
                    }}
                />
            </PopoverContent>
        </Popover>
    );
}
