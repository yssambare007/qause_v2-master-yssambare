import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { SearchProps } from "../../types/general";
import {
  doSearch,
  getFoundingYears,
  getStatesList,
} from "../../utils/apis/search/Index";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import QBreadCrumbs from "../../components/common/QBreadCrumbs";
import {
  Autocomplete,
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  Radio,
  TextField,
} from "@mui/material";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import { getAllCategories } from "../../utils/apis/profile/Index";
import { capitalizeEachFirstLetter } from "../../utils/utils";
import Layout from "../../components/layouts/defaultPages/Index";
import { SearchNGOResponse } from "../../types/search";
import SearchResultCard from "../../components/search/SearchResultCard";

function Filter({ title, children }: { title: string; children: JSX.Element }) {
  return (
    <div className="flex w-full flex-col px-4 py-3">
      <div className="mb-2 text-sm font-medium uppercase">{title}</div>
      {children}
    </div>
  );
}

interface FilterPanelProps {
  onFilterChange: (options: SearchProps) => void;
}

function FilterPanel(props: FilterPanelProps) {
  const { onFilterChange } = props;
  const [showAll, setShowAll] = useState<boolean>(false);

  const categories = useQuery(["categories"], getAllCategories);
  const states = useQuery(["states"], getStatesList);
  const foundingYears = useQuery(["foundingYears"], getFoundingYears);

  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedCatagories, setSelectedCategories] = useState<string[]>([]);
  const [yearRange, setYearRange] = useState<{ from?: string; to?: string }>(
    {}
  );

  const stateSelector = useRef<any>(null);
  const categorySelector = useRef<any>(null);
  const yearFromSelector = useRef<any>(null);
  const yearToSelector = useRef<any>(null);

  function onStateChange(e: any) {
    const value: string = e.target.innerHTML;
    setSelectedState(value);
  }

  const onCategoryClicked = useCallback(
    (e: any) => {
      const { checked, value } = e.target;
      if (checked) {
        setSelectedCategories((prev: any) => {
          const a = [...prev];
          a.push(value);
          return a;
        });
      } else {
        if (selectedCatagories.includes(value)) {
          setSelectedCategories((prev: any) =>
            prev.filter((e: any) => e !== value)
          );
        }
      }
    },
    [selectedCatagories]
  );

  function onFromDateChange(e: any) {
    setYearRange((prev: any) => ({ ...prev, from: e.target.value }));
  }

  function onToDateChange(e: any) {
    setYearRange((prev: any) => ({ ...prev, to: e.target.value }));
  }

  function fetchSearchResult() {
    const r: SearchProps = {};
    r.category = selectedCatagories.join(",").toLowerCase();
    r.location = selectedState.toLowerCase();
    r.from = yearRange.from;
    r.to = yearRange.to;
    onFilterChange(r);
  }

  const clearAllFilters = () => {
    setSelectedState("");
    setSelectedCategories([]);
    setYearRange({});
  };

  useEffect(() => {
    fetchSearchResult();
  }, [selectedState, selectedCatagories, yearRange]);

  return (
    <div className="flex h-full w-full flex-col justify-center px-1 py-4 shadow-lg">
      <Filter title="filters">
        <div className="flex items-center gap-x-4 text-sm font-medium uppercase">
          <div className="flex items-center gap-x-1">
            <Radio size="small" name="allfilters" className="px-0" />
            <label htmlFor="allfilters" className="text-xs">
              All
            </label>
          </div>
          <button
            className="leading-0 py-0 text-xs uppercase text-black"
            onClick={clearAllFilters}
          >
            Clear All
          </button>
        </div>
      </Filter>
      <Divider />
      <Filter title="location">
        <Autocomplete
          size="small"
          disablePortal
          options={states.data?.map((op: any) =>
            capitalizeEachFirstLetter(op.name)
          )}
          sx={{ width: "full", fontSize: "8px" }}
          renderOption={(params: any, option: any) => (
            <div {...params} className="cursor-pointer px-2 py-1 text-xs">
              {option}
            </div>
          )}
          ref={stateSelector}
          onChange={onStateChange}
          classes={{ inputRoot: "text-xs" }}
          renderInput={(params: any) => (
            <TextField
              {...params}
              size="small"
              placeholder="Select State"
              className="text-xs"
            />
          )}
        />
      </Filter>
      <Divider />
      <Filter title="categories">
        <div className="flex h-full w-full flex-col justify-center">
          {categories.data &&
            categories.data.slice(0, !showAll ? 5 : undefined).map((e: any) => (
              <Fragment key={e._id}>
                <FormControlLabel
                  onChange={onCategoryClicked}
                  control={<Checkbox value={e.name} />}
                  label={e.name}
                  componentsProps={{
                    typography: {
                      fontSize: ".8rem",
                    },
                  }}
                />
              </Fragment>
            ))}
          <span
            className="cursor-pointer text-sm text-qause-blue-gray hover:text-black"
            onClick={() => setShowAll(!showAll)}
          >
            {!showAll ? "Show More" : "Show Less"}
          </span>
        </div>
      </Filter>
      <Divider />
      <Filter title="founding year">
        <div className="flex flex-col gap-y-2">
          <select
            name="from"
            id="fyearfrom"
            ref={yearFromSelector}
            className="border-2 p-2"
            onChange={onFromDateChange}
          >
            <option disabled selected>
              Select From Year
            </option>
            {foundingYears.data &&
              foundingYears.data.data.map((d: number) => (
                <option key={d} value={`${d}`}>
                  {d}
                </option>
              ))}
          </select>
          <select
            name="to"
            id="fyearto"
            ref={yearToSelector}
            className="border-2 p-2"
            onChange={onToDateChange}
          >
            <option disabled selected>
              Select From Year
            </option>
            {foundingYears.data &&
              foundingYears.data.data.map((d: number) => (
                <option key={d} value={`${d}`}>
                  {d}
                </option>
              ))}
          </select>
        </div>
      </Filter>
      <div className="flex w-full justify-end p-2 px-4">
        <button
          className="rounded-md bg-qause-blue px-4 py-2 text-sm leading-tight text-white"
          onClick={fetchSearchResult}
        >
          Apply
        </button>
      </div>
    </div>
  );
}

export default function Result() {
  const [showFilterPanel, setShowFilterPanel] = useState<boolean>(false);
  const [searchOptions, setSearchOptions] = useState<SearchProps>({});
  const prepareObject = (obj: Record<string, any>): Record<string, any> =>
    Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [k, v === undefined ? "" : v])
    );

  function useSearch(filter: SearchProps) {
    return useQuery<any, Error>(["searchResult", filter], () =>
      doSearch(filter)
    );
  }

  const { data } = useSearch(searchOptions);

  function handleSearch(search: string) {
    setSearchOptions((options: any) => {
      return prepareObject({ ...options, search });
    });
  }

  function handleFilter(filter: SearchProps) {
    setSearchOptions((options: any) => {
      return prepareObject({ ...options, ...filter });
    });
  }

  return (
    <Layout navBarSearched={handleSearch}>
      <div className="h-full bg-qause-gray leading-none">
        <div className="flex h-full w-full flex-col">
          <div className="flex w-full items-center px-5 py-4">
            <QBreadCrumbs
              crumbs={[
                { label: "Qause", link: "/" },
                { label: "NGO", link: "/search/result" },
              ]}
              underline="none"
              className="text-sm font-medium text-[#7e7e7e] hover:text-black"
            />
          </div>
          <div className="flex w-full items-center bg-white px-4 py-3 md:hidden">
            <div className="text-lg font-bold">Filter</div>
            <IconButton
              className="text-blue-500"
              onClick={() => setShowFilterPanel(!showFilterPanel)}
            >
              <ArrowCircleDownIcon />
            </IconButton>
          </div>
          <div className="max-w-screen flex min-h-screen w-full bg-white xs:flex-col sm:flex-col md:flex-row lg:pb-[250px]">
            <div
              className={`h-full min-w-[300px] p-4 ${
                !showFilterPanel && "xs:hidden sm:hidden md:block"
              }`}
            >
              <FilterPanel onFilterChange={handleFilter} />
            </div>
            <div className="flex h-full max-w-full flex-grow flex-col justify-start gap-y-4 p-4">
              {data && (
                <div className="w-full rounded-md bg-qause-gray p-4 text-start font-bold text-qause-blue">{`${data.data.totalNgo} Results Found`}</div>
              )}
              {data && data.data.totalNgo === 0 && (
                <div className="w-full text-center text-3xl text-red-600">
                  No Result Found. Please search another NGO...
                </div>
              )}
              <div className="flex h-full max-h-screen w-full flex-wrap gap-x-6 gap-y-3 overflow-y-auto px-4">
                {data &&
                  data.data.totalNgo > 0 &&
                  data.data.ngos.map((ngo: SearchNGOResponse) => (
                    <Fragment key={ngo._id}>
                      <SearchResultCard ngo={ngo} />
                    </Fragment>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
