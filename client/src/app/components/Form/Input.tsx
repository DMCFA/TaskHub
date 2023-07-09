'use client';

import { FormControl, TextField } from '@mui/material';

interface InputFieldProps {
  id: string;
  label: string;
  helperText: string;
  error: boolean;
  value: string;
  wrapperClass: string;
  onChange: (value: string) => void;
}

export default function InputField({
  id,
  label,
  helperText,
  error,
  value,
  onChange,
  wrapperClass,
}: InputFieldProps) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <FormControl className={wrapperClass} fullWidth>
      <TextField
        id={id}
        className={error ? 'input--error' : ''}
        label={label}
        helperText={helperText}
        aria-describedby={`enter ${label}`}
        required
        error={error}
        value={value}
        onChange={handleInputChange}
      />
    </FormControl>
  );
}
