import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SelectInputProps = {
  label: string;
  optionTitle: string;
  className?: string;
  options: SelectOption[];
  selectedOption: any;
  setSelectedOption: any;
  initialData?: any;
};

export type SelectOption = {
  value: string;
  label: string;
};

export default function ShadSelectInput({
  label,
  className = "sm:col-span-2",
  optionTitle,
  options = [],
  selectedOption,
  setSelectedOption,
  initialData,
}: SelectInputProps) {
  React.useEffect(() => {
    if (initialData && !selectedOption) {
      setSelectedOption(initialData);
    }
  }, [initialData, selectedOption, setSelectedOption]);

  return (
    <div className={className}>
      <label
        htmlFor={label}
        className="block text-sm font-medium leading-6  mb-2"
      >
        {label}
      </label>
      <div className="mt-2 dark:text-white">
        <Select
          onValueChange={(value) => setSelectedOption(value)}
          value={selectedOption || initialData}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={`Select ${optionTitle}`} className="" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>{optionTitle}</SelectLabel>
              {options.map((item) => {
                return (
                  <SelectItem key={item.value} value={item.value} className="">
                    {item.label}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
