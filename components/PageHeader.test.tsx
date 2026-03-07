import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import PageHeader from "./PageHeader";

describe("PageHeader", () => {
  it("renders the title and subtitle correctly", () => {
    render(
      <PageHeader
        title="Test Title"
        subtitle="This is a test subtitle."
      />
    );

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Test Title");
    expect(screen.getByText("This is a test subtitle.")).toBeInTheDocument();
  });

  it("renders children when provided", () => {
    render(
      <PageHeader title="Header" subtitle="Sub">
        <button>Test Action Button</button>
      </PageHeader>
    );

    const button = screen.getByRole("button", { name: "Test Action Button" });
    expect(button).toBeInTheDocument();
  });
});
