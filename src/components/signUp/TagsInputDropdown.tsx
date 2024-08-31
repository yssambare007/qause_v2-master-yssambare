/* eslint-disable  @typescript-eslint/no-explicit-any */
const TagsInputDropdown = ({
  tags,
  setTags,
  category,
  setCategory,
  isCategoryDropdownOpen,
  setIsCategoryDropdownOpen,
  categories,
}: any) => {
  const removeTags = (indexToRemove: number) => {
    setTags([
      ...tags.filter((_: number, index: number) => index !== indexToRemove),
    ]);
  };

  const addTags = (event: any) => {
    if (event.target.value !== "") {
      const current = categories.filter((x: string) =>
        x.toLowerCase().startsWith(event.target.value.toLowerCase())
      );

      if (current.length != 0) {
        setTags([...tags, current[0]]);
      }

      event.target.blur();
      setCategory("");
      setIsCategoryDropdownOpen(false);
    }
  };

  return (
    <div className="relative flex flex-col flex-wrap items-start justify-start lg:min-w-[440px] xl:min-w-[478px]">
      <div className="mb-2 flex min-h-[55px] w-full items-center border-b border-l border-r border-t border-gray-400 px-[5px] py-[4px]">
        {tags.length > 0 && (
          <ul className="flex w-auto flex-wrap">
            <>
              {tags.map((tag: string, index: number) => (
                <li
                  key={tag}
                  className="m-[4px] flex items-center justify-center bg-gray-200 px-2 py-1"
                >
                  <span
                    className="relative top-[-2px] cursor-pointer rounded pr-1"
                    onClick={() => removeTags(index)}
                    data-testid={`x-${tag}`}
                  >
                    x
                  </span>
                  <span className="text-[0.825rem]" data-testid="tag-name">
                    {tag}
                  </span>
                </li>
              ))}
            </>
          </ul>
        )}

        <input
          type="text"
          onKeyUp={(event) => (event.key === "Enter" ? addTags(event) : null)}
          placeholder="Press enter to add tags"
          className={`flex-auto pb-1 pl-2 outline-0`}
          onClick={() => setIsCategoryDropdownOpen(true)}
          onChange={(e) => setCategory(e.target.value)}
          value={category}
        />
      </div>

      {isCategoryDropdownOpen && (
        <div
          className={`absolute left-0 top-[62px] z-50 max-h-[200px] w-full overflow-scroll overflow-x-hidden border-l border-r bg-[#fff]`}
          data-testid="dropdown"
        >
          {categories
            .filter((option: string) => !tags.includes(option))
            .filter((option: string) =>
              option.toLowerCase().startsWith(category)
            )
            .map((option: string, index: number) => {
              return (
                <div
                  className="cursor-pointer py-1 pl-4 text-[15px] font-normal hover:bg-[#eaeaea]"
                  key={option}
                  onClick={() => {
                    setTags([...tags, option]);
                    setIsCategoryDropdownOpen(false);
                    setCategory("");
                  }}
                >
                  {option}
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default TagsInputDropdown;
