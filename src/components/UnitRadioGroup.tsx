import type {
  PrecipitationUnit,
  TemperatureUnit,
  UnitInfo,
  WindSpeedUnit,
} from "../types/units";

import iconCheckmark from "../assets/icon-checkmark.svg";

interface Option<T> {
  label: string;
  value: T;
}

interface UnitRadioGroupProps<T> {
  legend: string;
  name: keyof UnitInfo;
  onChange: (value: T) => void;
  options: Option<T>[];
  value: T;
}

export default function UnitRadioGroup<
  T extends PrecipitationUnit | TemperatureUnit | WindSpeedUnit,
>({ legend, name, onChange, options, value }: UnitRadioGroupProps<T>) {
  /* --------------------------------- Markup --------------------------------- */

  const radioInputs = options.map((option) => {
    return (
      <label
        className="flex h-10 items-center justify-between rounded-md px-2 text-base hover:bg-neutral-700 has-checked:bg-neutral-700"
        key={option.value}
      >
        <span>{option.label}</span>

        <input
          checked={value === option.value}
          className="peer sr-only"
          name={name}
          onChange={() => {
            onChange(option.value);
          }}
          type="radio"
          value={option.value}
        />

        <img alt="" className="hidden peer-checked:block" src={iconCheckmark} />
      </label>
    );
  });

  return (
    <fieldset className="rounded-md py-1 outline-offset-1 has-focus:outline-1">
      <legend className="contents px-2 text-sm text-neutral-300">
        <span className="px-2">{legend}</span>
      </legend>

      <div className="mt-1 flex flex-col gap-0.5">{radioInputs}</div>
    </fieldset>
  );
}
