import { ChangeEventHandler } from 'react';

export default function Input({
  required = false,
  labelText,
  id,
  type,
  value = '',
  onChange,
}: {
  labelText: string;
  id: string;
  type: string;
  required: boolean;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <div className="mb-4 flex flex-col gap-1">
      <label htmlFor={id}>{labelText}</label>
      <input
        required={required}
        id={id}
        type={type}
        className="border-2 p-2 focus-within:outline-secondary"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
