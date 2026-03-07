import React from "react";

export type SummarySectionProps = {
    id: string;
    title: string;
    totalCount: number;
    itemNameSingular: string;
    itemNamePlural: string;
    countsByStatus: Record<string, number>;
    style?: React.CSSProperties;
};

export default function SummarySection({
    id,
    title,
    totalCount,
    itemNameSingular,
    itemNamePlural,
    countsByStatus,
    style,
}: SummarySectionProps) {
    const titleId = `${id}-title`;

    return (
        <section aria-labelledby={titleId} style={style}>
            <header className="card__header">
                <h2 id={titleId} className="page-header__title">
                    {title}
                </h2>
            </header>
            <p className="form-help">
                You have {totalCount} tracked {totalCount === 1 ? itemNameSingular : itemNamePlural}.
            </p>
            {totalCount > 0 ? (
                <ul className="updates-list" aria-label={`${title} by status`}>
                    {Object.entries(countsByStatus).map(([status, count]) => (
                        <li key={status} className="updates-list__item">
                            <span className="badge">{status}</span>{" "}
                            <span>
                                {count} {count === 1 ? itemNameSingular : itemNamePlural}
                            </span>
                        </li>
                    ))}
                </ul>
            ) : null}
        </section>
    );
}
