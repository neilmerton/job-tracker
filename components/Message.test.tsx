import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Message from "./Message";

describe("Message", () => {
    it("renders nothing if no message is provided", () => {
        const { container } = render(<Message />);
        expect(container).toBeEmptyDOMElement();
    });

    it("renders the message text correctly", () => {
        render(<Message message="Hello world" />);
        const alertElement = screen.getByRole("alert");
        expect(alertElement).toBeInTheDocument();
        expect(alertElement).toHaveTextContent("Hello world");
    });

    it("applies the default info styles when no type is provided", () => {
        render(<Message message="Default style" />);
        const alertElement = screen.getByRole("alert");
        expect(alertElement).toHaveStyle({
            color: "var(--color-info)",
            backgroundColor: "var(--color-info-bg)",
        });
    });

    it("applies the correct styles for error type", () => {
        render(<Message message="Error style" type="error" />);
        const alertElement = screen.getByRole("alert");
        expect(alertElement).toHaveStyle({
            color: "var(--color-danger)",
            backgroundColor: "var(--color-danger-bg)",
        });
    });

    it("applies the correct styles for success type", () => {
        render(<Message message="Success style" type="success" />);
        const alertElement = screen.getByRole("alert");
        expect(alertElement).toHaveStyle({
            color: "var(--color-success)",
            backgroundColor: "var(--color-success-bg)",
        });
    });

    it("applies the correct styles for warning type", () => {
        render(<Message message="Warning style" type="warning" />);
        const alertElement = screen.getByRole("alert");
        expect(alertElement).toHaveStyle({
            color: "var(--color-warning)",
            backgroundColor: "var(--color-warning-bg)",
        });
    });
});
