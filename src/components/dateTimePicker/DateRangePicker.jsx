import { CalendarDays } from 'lucide-react';
import React from 'react'
import { Label } from "@radix-ui/react-label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Calendar } from "../ui/calendar";
import { Button } from '../ui/button';

export default function DateRangePicker({label, value, onChange}) {
    const [open, setOpen] = React.useState(false);
  return (
    <div className="flex items-center flex-1 mr-4 w-full ">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date-picker"
            className="font-normal bg-gray-100"
          >
            <CalendarDays />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            captionLayout="dropdown"
            onSelect={(date) => {
              onChange(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
      <Label htmlFor="date-picker" className="ml-2">
        {value ? value.toLocaleDateString() : label}
      </Label>
    </div>
  );
}
