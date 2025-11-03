interface Option<T> {
  label: string;
  value: T;
}

interface UnitRadioInputProps<T> {
  legend: string;
  name: string;
  options: Option<T>[];
  value: T;
  onValueChange: (value: T) => void;
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
      <label key={option.value}>
        <p>{option.label}</p>
        <input
          type="radio"
          name={name}
          value={option.value}
          checked={value === option.value}
          onChange={() => {
            onValueChange(option.value);
          }}
        />
      </label>
    );
  });

  return (
    <fieldset>
      <legend>{legend}</legend>

      {radioInputs}
    </fieldset>
  );
}

export default UnitRadioInput;
