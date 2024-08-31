import { useState } from "react";
import EditIcon from "./../../../public/images/profile/editIcon.svg";

interface EditableContainer {
  children: React.ReactNode;
  className: string;
  onEdit?: () => void;
  editing?: boolean;
}
function EditableContainer(props: EditableContainer) {
  return (
    <div
      className={
        "relative rounded-lg border border-gray-300 px-8 py-3 " +
        props.className
      }
      style={{
        minHeight: "206px",
      }}
    >
      <>
        {!props.editing ? (
          <div
            className="absolute right-5 top-4 inline-block cursor-pointer rounded-full border-[#000000] px-4 py-1"
            style={{ borderWidth: "1px" }}
            onClick={props.onEdit}
          >
            <EditIcon />
          </div>
        ) : (
          <div
            className="absolute right-5 top-4 inline-block cursor-pointer rounded-full border-[#000000] px-4 py-1"
            style={{ borderWidth: "1px" }}
            onClick={props.onEdit}
          >
            <h1>Cancel</h1>
          </div>
        )}
      </>
      {props.children}
    </div>
  );
}

EditableContainer.defaultProps = {
  className: "",
};

export default EditableContainer;
