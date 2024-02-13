import { Dispatch, SetStateAction } from "react";

const handleFilterChange = (
  id: string,
  setFilter: Dispatch<
    SetStateAction<
      {
        id: string;
        label: string;
        checked: boolean;
      }[]
    >
  >
) => {
  setFilter((prevCheckboxes) =>
    prevCheckboxes.map((checkbox) =>
      checkbox.id === id
        ? { ...checkbox, checked: !checkbox.checked }
        : checkbox
    )
  );
};

export default handleFilterChange;
