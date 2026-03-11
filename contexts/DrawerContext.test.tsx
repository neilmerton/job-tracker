import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act, fireEvent } from "@testing-library/react";
import { DrawerProvider, useDrawer } from "./DrawerContext";

const TestComponent = () => {
  const { isOpen, title, content, openDrawer, closeDrawer } = useDrawer();

  return (
    <div>
      <div data-testid="is-open">{isOpen ? "true" : "false"}</div>
      <div data-testid="title">{title}</div>
      <div data-testid="content">{content}</div>
      <button onClick={() => openDrawer("Test Title", <div>Test Content</div>)}>
        Open
      </button>
      <button onClick={closeDrawer}>Close</button>
    </div>
  );
};

describe("DrawerContext", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("provides initial state and updates correctly when opened and closed", async () => {
    render(
      <DrawerProvider>
        <TestComponent />
      </DrawerProvider>
    );

    // Initial state
    expect(screen.getByTestId("is-open")).toHaveTextContent("false");
    expect(screen.getByTestId("title")).toBeEmptyDOMElement();
    expect(screen.getByTestId("content")).toBeEmptyDOMElement();

    // Open drawer
    fireEvent.click(screen.getByRole("button", { name: "Open" }));

    expect(screen.getByTestId("is-open")).toHaveTextContent("true");
    expect(screen.getByTestId("title")).toHaveTextContent("Test Title");
    expect(screen.getByTestId("content")).toHaveTextContent("Test Content");

    // Close drawer
    fireEvent.click(screen.getByRole("button", { name: "Close" }));

    expect(screen.getByTestId("is-open")).toHaveTextContent("false");
    // Title and content should still be present immediately after closing (for animation)
    expect(screen.getByTestId("title")).toHaveTextContent("Test Title");
    expect(screen.getByTestId("content")).toHaveTextContent("Test Content");

    // Fast forward to clear content
    act(() => {
        vi.advanceTimersByTime(300);
    });

    expect(screen.getByTestId("title")).toBeEmptyDOMElement();
    expect(screen.getByTestId("content")).toBeEmptyDOMElement();
  });
});
