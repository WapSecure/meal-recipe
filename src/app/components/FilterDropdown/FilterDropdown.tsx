import { useState, useEffect } from "react";
import axios from "axios";
import { Select } from "@/app/components/Select/Select";
import { API_BASE_URL } from "../../utils/constants";

interface Area {
  strArea: string;
}

interface FilterDropdownProps {
  onSelect: (area: string) => void;
  className?: string;
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({
  onSelect,
  className = "",
}) => {
  const [areas, setAreas] = useState<Area[]>([]);
  const [selectedArea, setSelectedArea] = useState("");

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/list.php?a=list`);
        setAreas(response.data.meals || []);
      } catch (error) {
        console.error("Error fetching areas:", error);
      }
    };

    fetchAreas();
  }, []);

  const handleChange = (value: string) => {
    setSelectedArea(value);
    onSelect(value);
  };

  return (
    <Select
      label=""
      value={selectedArea}
      onChange={(e) => handleChange(e.target.value)}
      options={[
        { value: "", label: "All Areas" },
        ...areas.map((area) => ({
          value: area.strArea,
          label: area.strArea,
        })),
      ]}
      className={className}
    />
  );
};
