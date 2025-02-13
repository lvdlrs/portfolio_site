export function Pill(props: { label: string }) {
  return (
    <div>
      <p className="bg-background-accent rounded-button w-fit px-4 py-2">
        {props.label}
      </p>
    </div>
  );
}
