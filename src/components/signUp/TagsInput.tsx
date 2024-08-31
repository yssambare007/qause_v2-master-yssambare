/* eslint-disable  @typescript-eslint/no-explicit-any */
const TagsInput = ({ tags, setTags }: any) => {
  const removeTags = (indexToRemove: number) => {
    setTags([
      ...tags.filter((_: number, index: number) => index !== indexToRemove),
    ]);
  };
  const addTags = (event: any) => {
    if (event.target.value !== "") {
      setTags([...tags, event.target.value]);
      event.target.value = "";
    }
  };
  return (
    <div className="flex flex-col flex-wrap items-start justify-start lg:min-w-[440px] lg:max-w-[440px] xl:min-w-[478px] xl:max-w-[478px]">
      <div className="mb-2 flex min-h-[55px] w-full items-center border-b border-l border-r border-t border-gray-400 px-[5px] py-[4px]">
        <input
          type="text"
          onKeyUp={(event) => (event.key === "Enter" ? addTags(event) : null)}
          placeholder="Press enter to add tags"
          className="flex-1 pb-1 pl-2 outline-0"
        />
      </div>

      <ul className="flex w-full flex-wrap">
        {tags.map((tag: string, index: number) => (
          <li
            key={tag}
            className="m-[4px] flex items-center justify-center bg-gray-200 px-1 py-1"
          >
            <span
              className="relative top-[-6px] cursor-pointer rounded pr-1"
              onClick={() => removeTags(index)}
            >
              x
            </span>
            <span className="tag-title">{tag}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TagsInput;
