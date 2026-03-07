import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import Drawer from "./Drawer";

describe("Drawer", () => {
    it("renders the trigger button with the correct label and command attributes", () => {
        render(
            <Drawer id="test-drawer" buttonLabel="Open Drawer" drawerTitle="Drawer Title">
                <p>Content</p>
            </Drawer>
        );

        const triggerBtn = screen.getByRole("button", { name: "Open Drawer" });
        expect(triggerBtn).toBeInTheDocument();
        expect(triggerBtn).toHaveAttribute("id", "test-drawer-trigger");
        expect(triggerBtn).toHaveAttribute("commandfor", "test-drawer");
        expect(triggerBtn).toHaveAttribute("command", "show-modal");
    });

    it("renders the dialog with the correct title and children", () => {
        // Note: By default, JSDOM does not fully support the <dialog> element's visibility/interactivity semantics, 
        // but we can still verify its DOM structure.
        render(
            <Drawer id="my-drawer" buttonLabel="Open" drawerTitle={<span>My Title</span>}>
                <div data-testid="drawer-child">Child Element</div>
            </Drawer>
        );

        const dialog = screen.getByRole("dialog", { hidden: true }); // <dialog> might be hidden by default
        expect(dialog).toBeInTheDocument();
        expect(dialog).toHaveAttribute("id", "my-drawer");

        const heading = screen.getByRole("heading", { level: 2, hidden: true, name: "My Title" });
        expect(heading).toBeInTheDocument();

        const child = screen.getByTestId("drawer-child");
        expect(child).toBeInTheDocument();
    });

    it("renders the close button inside the dialog with the correct command attributes", () => {
        render(
            <Drawer id="close-test" buttonLabel="Open" drawerTitle="Title">
                <p>Text</p>
            </Drawer>
        );

        const dialog = screen.getByRole("dialog", { hidden: true });
        const closeBtn = within(dialog).getByRole("button", { hidden: true, name: "Close" });

        expect(closeBtn).toBeInTheDocument();
        expect(closeBtn).toHaveAttribute("commandfor", "close-test");
        expect(closeBtn).toHaveAttribute("command", "close");
    });
});
