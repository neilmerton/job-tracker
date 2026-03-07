import { describe, it, expect } from "vitest";
import { countByStatus } from "./dataProcessing";

describe("countByStatus", () => {
  it("should return an empty object when passed an empty array", () => {
    const result = countByStatus([]);
    expect(result).toEqual({});
  });

  it("should aggregate items correctly based on the default 'status' key", () => {
    const items = [
      { id: 1, status: "applied" },
      { id: 2, status: "interviewing" },
      { id: 3, status: "applied" },
      { id: 4, status: "rejected" },
    ];

    const result = countByStatus(items);
    expect(result).toEqual({
      applied: 2,
      interviewing: 1,
      rejected: 1,
    });
  });

  it("should ignore items that lack the specified key", () => {
    const items = [
      { id: 1, status: "offer" },
      { id: 2 }, // Missing status
      { id: 3, status: "offer" },
    ];

    const result = countByStatus(items);
    expect(result).toEqual({ offer: 2 });
  });

  it("should aggregate items correctly based on a custom key", () => {
    const items = [
      { id: 1, type: "job" },
      { id: 2, type: "connection" },
      { id: 3, type: "job" },
    ];

    const result = countByStatus(items, "type");
    expect(result).toEqual({
      job: 2,
      connection: 1,
    });
  });
});
