type InputTypes = {
  label?: string;
  type?: string;
  name?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  required?: boolean;
  readOnly?: boolean;
};

const Input = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  className,
  required = false,
  readOnly = false,
}: InputTypes) => {
  return (
    <label className="flex flex-col gap-1 w-full">
      <p className="flex items-center gap-1 ml-1">
        {label} <span className={required ? 'text-red-600' : 'hidden'}>*</span>
      </p>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`py-[6px] px-3 font-normal placeholder:!font-light  placeholder:text-[13px] text-[14px] flex items-center w-full rounded-lg border-[1.3px] border-light border-opacity-50 outline-none focus:outline-none focus:border-[1.6px] focus:border-primary ease-in-out duration-50 ${className} ${
          readOnly &&
          '!border-[.1px] !border-background hover:cursor-default focus:!border-background'
        }`}
      />
    </label>
  );
};

export default Input;
