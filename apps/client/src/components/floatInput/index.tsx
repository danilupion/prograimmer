import { ChangeEvent, FC, useState } from 'react';

interface FloatInputProps {
  value: number;
  onChange: (value: number) => void;
}

const FloatInput: FC<FloatInputProps> = ({ value, onChange }) => {
  const [internalValue, setInternalValue] = useState<string>(value.toString());

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (!newValue || newValue === '.' || /^-?\d+[.,]?\d*$/.test(newValue)) {
      setInternalValue(newValue);
      if (newValue !== '.') {
        onChange(parseFloat(newValue));
      }
    }
  };

  return <input type="number" value={internalValue} onChange={handleChange} />;
};

export default FloatInput;
