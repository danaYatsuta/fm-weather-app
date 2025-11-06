import type { UnitInfo } from "../types";

import iconCheckmark from "../assets/icon-checkmark.svg";

interface Option<T> {
  label: string;
  value: T;
}

interface UnitRadioInputProps<T> {
  legend: string;
  name: keyof UnitInfo;
  options: Option<T>[];
  value: T;
  onValueChange: React.ChangeEventHandler;
}

function UnitRadioInput<T extends string>({
  legend,
  name,
  options,
  value,
  onValueChange,
}: UnitRadioInputProps<T>) {
  const radioInputs = options.map((option) => {
    return (
      <label
        className="flex h-10 items-center justify-between rounded-md px-2 text-base hover:bg-neutral-700 has-checked:bg-neutral-700"
        key={option.value}
      >
        <span>{option.label}</span>

        <input
          className="peer hidden"
          type="radio"
          name={name}
          value={option.value}
          checked={value === option.value}
          onChange={onValueChange}
        />

        <img src={iconCheckmark} alt="" className="hidden peer-checked:block" />
      </label>
    );
  });

  return (
    <fieldset className="py-1 first:pt-0 last:pb-0">
      <span className="px-2 text-sm text-neutral-300">{legend}</span>

      <div className="mt-1 flex flex-col gap-0.5">{radioInputs}</div>
    </fieldset>
  );
}

export default UnitRadioInput;
