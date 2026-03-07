import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import SummarySection from "./SummarySection";

describe("SummarySection", () => {
  it("renders the title", () => {
    render(
      <SummarySection
        id="test-sec"
        title="My Summary"
        totalCount={0}
        itemNameSingular="item"
        itemNamePlural="items"
        countsByStatus={{}}
      />
    );

    expect(screen.getByRole("heading", { level: 2, name: "My Summary" })).toBeInTheDocument();
  });

  it("displays the correct plural text when count is 0", () => {
    render(
      <SummarySection
        id="test-sec"
        title="Items"
        totalCount={0}
        itemNameSingular="apple"
        itemNamePlural="apples"
        countsByStatus={{}}
      />
    );

    expect(screen.getByText(/You have 0 tracked apples\./)).toBeInTheDocument();
  });

  it("displays the correct singular text when count is 1", () => {
    render(
      <SummarySection
        id="test-sec"
        title="Items"
        totalCount={1}
        itemNameSingular="apple"
        itemNamePlural="apples"
        countsByStatus={{}}
      />
    );

    expect(screen.getByText(/You have 1 tracked apple\./)).toBeInTheDocument();
  });

  it("does not render the status list if the total count is 0", () => {
    render(
      <SummarySection
        id="test-sec"
        title="Items"
        totalCount={0}
        itemNameSingular="apple"
        itemNamePlural="apples"
        countsByStatus={{}}
      />
    );

    const list = screen.queryByRole("list");
    expect(list).not.toBeInTheDocument();
  });

  it("renders the status list items with correct badges and counts", () => {
    render(
      <SummarySection
        id="test-sec"
        title="Items"
        totalCount={3}
        itemNameSingular="apple"
        itemNamePlural="apples"
        countsByStatus={{
          fresh: 2,
          rotten: 1,
        }}
      />
    );

    const list = screen.getByRole("list", { name: "Items by status" });
    expect(list).toBeInTheDocument();

    const listItems = within(list).getAllByRole("listitem");
    expect(listItems).toHaveLength(2);

    // Check first item "fresh"
    expect(within(listItems[0]).getByText("fresh")).toBeInTheDocument();
    expect(within(listItems[0]).getByText(/2 apples/)).toBeInTheDocument();

    // Check second item "rotten"
    expect(within(listItems[1]).getByText("rotten")).toBeInTheDocument();
    expect(within(listItems[1]).getByText(/1 apple/)).toBeInTheDocument(); // singular check within list
  });
});
