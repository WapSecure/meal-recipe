import { render, screen, waitFor } from "@testing-library/react";
import { FilterDropdown } from "./FilterDropdown";
import axios from "axios";

jest.mock("axios");

const mockAreas = [
  { strArea: "Area1" },
  { strArea: "Area2" },
];

describe("FilterDropdown", () => {
  it("renders areas fetched from the API", async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: { meals: mockAreas } });

    render(<FilterDropdown onSelect={() => {}} />);

    await waitFor(() => {
      expect(screen.getByText("All Areas")).toBeInTheDocument();
      expect(screen.getByText("Area1")).toBeInTheDocument();
      expect(screen.getByText("Area2")).toBeInTheDocument();
    });
  });
});