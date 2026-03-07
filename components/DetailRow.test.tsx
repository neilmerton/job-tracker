import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import DetailRow from "./DetailRow";

describe("DetailRow", () => {
  it("renders the label and value correctly", () => {
    render(<DetailRow label="Some Label" value="Some Value" />);

    const labelElement = screen.getByText("Some Label");
    expect(labelElement).toBeInTheDocument();
    expect(labelElement.tagName).toBe("DT");

    const valueElement = screen.getByText("Some Value");
    expect(valueElement).toBeInTheDocument();
    expect(valueElement.tagName).toBe("DD");
  });

  it("renders complex React nodes for label and value", () => {
    render(
      <DetailRow
        label={<span data-testid="custom-label">Label Node</span>}
        value={<div data-testid="custom-value">Value Node</div>}
      />
    );

    expect(screen.getByTestId("custom-label")).toBeInTheDocument();
    expect(screen.getByTestId("custom-value")).toBeInTheDocument();
  });
});
