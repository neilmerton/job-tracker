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
      color: "var(--color-danger)",
      borderColor: "var(--color-danger)",
      backgroundColor: "var(--color-danger-bg)",
    },
    info: {
      color: "var(--color-info)",
      borderColor: "var(--color-border)",
      backgroundColor: "var(--color-info-bg)",
    },
    success: {
      color: "var(--color-success)",
      borderColor: "var(--color-success)",
      backgroundColor: "var(--color-success-bg)",
    },
    warning: {
      color: "var(--color-warning)",
      borderColor: "var(--color-warning)",
      backgroundColor: "var(--color-warning-bg)",
    },
  };

  return (
    <div style={{ ...baseStyles, ...typeStyles[type] }} role="alert">
      {message}
    </div>
  );
}
