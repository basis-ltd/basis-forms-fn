import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useState } from 'react';
import { CommandList } from 'cmdk';

type ComboboxProps = {
  options?: { label: string; value: string }[];
  placeholder?: string;
  label?: string;
  required?: boolean;
  labelClassName?: string;
  onChange?: ((value: string) => void) | undefined;
};

const Combobox = ({
  options = [],
  placeholder = 'Select...',
  labelClassName,
  label,
  required = false,
  onChange,
}: ComboboxProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  
  return (
    <label className={`flex flex-col gap-1 w-full ${labelClassName}`}>
      <p className={label ? 'flex items-center gap-1 ml-1' : 'hidden'}>
        {label} <span className={required ? `text-red-600` : 'hidden'}>*</span>
      </p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between h-10"
          >
            {value
              ? options.find((option) => option.value === value)?.label
              : placeholder}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command className='w-full'>
            <CommandInput placeholder={'Search...'} className="w-full h-10" />
            <CommandList>
            <CommandEmpty>No item found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue);
                    onChange && onChange(currentValue);
                    setOpen(false);
                  }}
                >
                  {option.label}
                  <CheckIcon
                    className={cn(
                      'ml-auto h-4 w-4',
                      value === option.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </label>
  );
};

export default Combobox;
