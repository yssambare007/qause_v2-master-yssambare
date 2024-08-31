import EditIcon from "./../../../../public/images/profile/editIcon.svg";

interface EditableContainer {
  children: React.ReactNode;
  className: string;
  onEdit?: () => void;
  editing?: boolean;
}

function EditableContainer(props: EditableContainer) {
  return (
    <div className={"relative shadow-md rounded-lg border border-gray-300 md:px-8 sm:px-2 xs:px-2 py-3 " + props.className} style={{
        minHeight: "206px"
    }}>
      <>
        {!props.editing ? 
          <div 
            className="absolute right-5 top-4 inline-block rounded-full border-[#000000] px-4 py-1 cursor-pointer"
            style={{ borderWidth: "1px", }}
            onClick={props.onEdit}
            >
            <EditIcon />
          </div> : 
          <></>
        } 
      </>
        {props.children}
    </div>
  );
}

EditableContainer.defaultProps = {
    className: "",
};

export default EditableContainer;
