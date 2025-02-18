import { renderHook, act } from "@testing-library/react";
import { useDebounce } from "./useDebounce";

describe("useDebounce", () => {
  jest.useFakeTimers();

  it("debounces the value", () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: "initial", delay: 500 },
    });

    expect(result.current).toBe("initial");

    act(() => {
      rerender({ value: "updated", delay: 500 });
      jest.advanceTimersByTime(499);
    });

    expect(result.current).toBe("initial");

    act(() => {
      jest.advanceTimersByTime(1);
    });

    expect(result.current).toBe("updated");
  });
});