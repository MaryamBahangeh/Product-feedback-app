import { useContext } from "react";

import clsx from "clsx";

import { SearchContext } from "@/providers/SearchProvider.tsx";

import { SORT_OPTIONS } from "@/dropdown-options/sort-options.ts";

import Button, {
  ButtonType,
  Color,
  Variant,
} from "@/components/Button/Button.tsx";

import styles from "./Toolbar.module.css";
import i18next from "i18next";
import { LANGUAGE_DROPDOWN_OPTIONS } from "@/dropdown-options/language-options.ts";
import { useTranslation } from "react-i18next";
import { LOCAL_STORAGE_LANGUAGE_KEY } from "@/constants/localstorage.constants.ts";
import Select from "@/components/Select/Select.tsx";
import { DropdownOption } from "@/models/dropdown-type.ts";

type Props = {
  className?: string;
};

function Toolbar({ className }: Props) {
  const { filteredSuggestions, sortBy, setSortBy } = useContext(SearchContext);

  const { t } = useTranslation();

  const languageChangeHandler = async (
    language: DropdownOption,
  ): Promise<void> => {
    try {
      await i18next.changeLanguage(language.value);

      localStorage.setItem(LOCAL_STORAGE_LANGUAGE_KEY, language.value);

      document.documentElement.lang = i18next.language;
      document.documentElement.dir = i18next.dir();
    } catch (err) {
      console.log("Something went wrong loading", err);
    }
  };

  const languageDefaultValue = (): string => {
    console.log(
      "language=" +
        (localStorage.getItem(LOCAL_STORAGE_LANGUAGE_KEY) ?? i18next.language),
    );
    return localStorage.getItem(LOCAL_STORAGE_LANGUAGE_KEY) ?? i18next.language;
  };

  return (
    <div className={clsx(styles.toolbar, className)}>
      <div className={styles.suggestions}>
        <img src="/images/icones/suggestion/icon-suggestions.svg" alt="" />

        <span>
          {filteredSuggestions.length.toString() +
            " " +
            (filteredSuggestions.length > 1
              ? t("toolbar.suggestions")
              : t("toolbar.suggestion"))}
        </span>
      </div>

      <label>
        {t("toolbar.sortBy")}:
        <Select
          defaultValue={sortBy}
          onChange={(option) => setSortBy(option.value)}
          options={SORT_OPTIONS}
        ></Select>
      </label>

      <Select
        defaultValue={languageDefaultValue()}
        onChange={languageChangeHandler}
        options={LANGUAGE_DROPDOWN_OPTIONS}
      ></Select>

      <Button
        buttonType={ButtonType.LINK}
        linkTo={"/suggestion/create"}
        variant={Variant.SOLID}
        color={Color.PRIMARY}
      >
        <img src="/images/icones/shared/icon-plus.svg" alt="add feedback" />
        {t("toolbar.AddFeedback")}
      </Button>
    </div>
  );
}

export default Toolbar;
