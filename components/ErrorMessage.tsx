export default function ErrorMessage({ error }: { error?: string | null }) {
    if (!error) return null;

    return (
        <div
            style={{
                color: "red",
                marginBottom: "1rem",
                padding: "0.5rem",
                border: "1px solid red",
                borderRadius: "4px",
                fontSize: "0.85rem",
            }}
            role="alert"
        >
            {error}
        </div>
    );
}
