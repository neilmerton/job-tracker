import React from "react";

export type DetailRowProps = {
    label: React.ReactNode;
    value: React.ReactNode;
};

export default function DetailRow({ label, value }: DetailRowProps) {
    return (
        <div className="form-field">
            <dt className="form-label" style={{ fontSize: "0.85rem" }}>
                {label}
            </dt>
            <dd style={{ margin: 0, fontSize: "0.85rem", color: "var(--color-muted)" }}>
                {value}
            </dd>
        </div>
    );
}
