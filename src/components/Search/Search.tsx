import { useContext } from "react";

import { SearchContext } from "@/providers/SearchProvider.tsx";

import Card from "@/components/Card/Card.tsx";
import Button, { Color, Variant } from "@/components/Button/Button.tsx";

import { SUGGESTION_OPTIONS } from "@/suggestion-options/suggestion-options.ts";

import styles from "./Search.module.css";

function Search() {
  const { filteredType, setFilteredType } = useContext(SearchContext);

  return (
    <Card className={styles.search}>
      <Button
        variant={Variant.SECONDARY}
        color={filteredType === "All" ? Color.BLUE : Color.GRAY}
        onClick={() => setFilteredType("All")}
      >
        All
      </Button>

      {SUGGESTION_OPTIONS.map((option) => (
        <Button
          key={option.value}
          variant={Variant.SECONDARY}
          color={filteredType === option.name ? Color.BLUE : Color.GRAY}
          onClick={() => setFilteredType(option.value)}
        >
          {option.name}
        </Button>
      ))}
    </Card>
  );
}

export default Search;
