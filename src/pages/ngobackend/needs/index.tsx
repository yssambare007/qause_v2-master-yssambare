import React, { useCallback, useEffect, useState } from "react";
import NgoDashboardFrame from "../../../components/common/NgoDashboardFrame";
import NeedAllCards from "../../../components/needs/NeedsAllCards";

import type { SelectChangeEvent } from "@mui/material";
import {
  TextField,
  IconButton,
  InputAdornment,
  Select,
  MenuItem,
} from "@mui/material";
import { Search, Clear } from "@mui/icons-material";
import { useRouter } from "next/router";

interface SearchProps {
  placeholder?: string;
  onSubmit: (value: string) => void;
  className?: string;
  currentSearchText: string;
}

const SearchInput: React.FC<SearchProps> = ({
  onSubmit,
  placeholder,
  className,
  currentSearchText,
}) => {
  const [searchText, setSearchText] = useState<string>("");
  const router = useRouter();

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(event.target.value);
    },
    []
  );

  const handleClearClick = useCallback(() => {
    setSearchText("");
    onSubmit("");
  }, [onSubmit]);

  const handleSearchClick = useCallback(() => {
    onSubmit(searchText);
  }, [onSubmit, searchText]);

  useEffect(() => {
    const token = localStorage.getItem("TOKEN");
    if (!token) router.push("/ngo-login");
  }, []);

  return (
    <TextField
      variant="outlined"
      color="primary"
      className={`${className}`}
      value={searchText}
      placeholder={placeholder}
      onChange={handleInputChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {("" !== currentSearchText || "" !== searchText) && (
              <IconButton size="small" onClick={handleClearClick}>
                <Clear />
              </IconButton>
            )}
            <IconButton size="small" onClick={handleSearchClick}>
              <Search />
            </IconButton>
          </InputAdornment>
        ),
        sx: {
          borderRadius: 0,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        },
      }}
    />
  );
};

const Index = () => {
  const tabs = ["All", "Services", "Fund", "Item"];
  const [currentTab, setCurrentTab] = useState(0);
  const [searchText, setSearchText] = useState<string>("");
  const [credits, setCredits] = useState<string>("");

  const handleChange = useCallback((index: number) => {
    setCurrentTab(index);
  }, []);

  const handleCreditChange = useCallback((event: SelectChangeEvent<string>) => {
    setCredits(event.target.value);
  }, []);

  const handleSearch = useCallback(
    (value: string) => {
      if (value !== searchText) setSearchText(value);
    },
    [searchText]
  );

  return (
    <NgoDashboardFrame>
      <div className="flex h-full w-full flex-col items-center bg-[#F8F8F8] pt-8">
        <div className="relative flex sm:h-full w-full flex-col items-center justify-center xs:px-4 sm:px-4 md:px-20">
          <div className="sm:sticky top-0 mt-8 flex sm:h-1/5 w-full flex-col items-center justify-center gap-y-6 px-4">
            <div className="text-blue-dark text-center text-lg">
              <span className="text-[#0020D3]">Skilled volunteers</span> are
              just a click away!
            </div>

            <div className="flex flex-row items-center justify-center gap-x-2 text-xs font-extralight">
              {tabs.map((label: string, index: number) => (
                <button
                  key={label}
                  className={`${
                    currentTab === index
                      ? "bg-qause-yellow text-white"
                      : "border border-gray-700 bg-white text-gray-600"
                  } box-border flex h-full items-center justify-center rounded-full px-5 pb-2 pt-1 text-xs font-normal transition-colors duration-300 hover:bg-qause-yellow hover:text-white hover:ease-in`}
                  onClick={() => handleChange(index)}
                >
                  <span>{label}</span>
                </button>
              ))}
            </div>

            <div className="flex w-full flex-wrap items-center justify-center gap-3 bg-[#F8F8F8] py-2">
              <SearchInput
                className="flex-1 bg-white"
                placeholder="Ex: Graphic designer, annual report, teacher"
                onSubmit={handleSearch}
                currentSearchText={searchText}
              />
              <Select
                className="bg-white xs:w-full sm:w-full md:w-3/12"
                displayEmpty
                size="small"
                value={credits}
                inputProps={{ "aria-label": "Without label" }}
                onChange={handleCreditChange}
                sx={{
                  borderRadius: 0,
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 0,
                }}
              >
                <MenuItem value="">Credit First</MenuItem>
                {new Array(5)
                  .fill(0)
                  .map((e, i) => i)
                  .map((i: number) => (
                    <MenuItem
                      key={i}
                      className="text-sm font-light"
                      value={(i + 1) * 5}
                    >{`Under ${(i + 1) * 5} Credit`}</MenuItem>
                  ))}
              </Select>
            </div>
          </div>
          <div className="sm:max-h-screen w-full sm:flex-1 sm:overflow-y-auto px-4 pb-24 sm:mt-10">
            <NeedAllCards
              category={currentTab === 0 ? "" : tabs[currentTab]}
              credits={credits}
              search={searchText}
            />
          </div>
        </div>
      </div>
    </NgoDashboardFrame>
  );
};

export default Index;
