export default function Input({
  labelText,
  id,
  type,
}: {
  labelText: string;
  id: string;
  type: string;
}) {
  return (
    <div className="mb-4 flex flex-col gap-1">
      <label htmlFor={id}>{labelText}</label>
      <input
        id={id}
        type={type}
        className="border-2 p-2 focus-within:outline-secondary"
      />
    </div>
  );
}
