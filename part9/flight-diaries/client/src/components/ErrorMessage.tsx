interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div>
      <h3 style={{ color: "red" }}>{message}</h3>
    </div>
  );
}
