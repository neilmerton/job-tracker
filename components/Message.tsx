type MessageProps = {
  message?: string | null;
  type?: "error" | "info" | "success" | "warning";
};

export default function Message({ message, type = "info" }: MessageProps) {
  if (!message) return null;

  const baseStyles = {
    marginBottom: "1rem",
    padding: "0.5rem",
    borderRadius: "4px",
    fontSize: "0.85rem",
    border: "1px solid",
  };

  const typeStyles = {
    error: {
      color: "red",
      borderColor: "red",
      backgroundColor: "rgba(255, 0, 0, 0.05)",
    },
    info: {
      color: "var(--color-text)",
      borderColor: "var(--color-border)",
      backgroundColor: "var(--color-bg-secondary)",
    },
    success: {
      color: "green",
      borderColor: "green",
      backgroundColor: "rgba(0, 128, 0, 0.05)",
    },
    warning: {
      color: "#b8860b", // Dark goldenrod
      borderColor: "#b8860b",
      backgroundColor: "rgba(184, 134, 11, 0.05)",
    },
  };

  return (
    <div style={{ ...baseStyles, ...typeStyles[type] }} role="alert">
      {message}
    </div>
  );
}
