import { Checkbox } from "@/components/ui/checkbox";

type CheckboxInputProps = {
  name: string;
  label: string;
  defaultChecked?: boolean;
};

const CheckboxInput = ({ label, name, defaultChecked }: CheckboxInputProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={name}
        name={name}
        defaultChecked={defaultChecked}
      ></Checkbox>
      <label
        htmlFor={name}
        className="text-sm leading-none capitalize peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  );
};

export default CheckboxInput;
