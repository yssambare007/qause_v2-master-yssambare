import ATMCard, { CardType } from "./ATMCard";
import AddPaymentMethod from "../../../public/images/profile/addPaymentMethod.svg";
import { useState, useRef, useEffect } from "react";
import AddPaymentForm from "./AddPaymentForm";

const EditableCards: React.FC = () => {
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const toggleWindowVisibility = () => {
    setOpen(!open);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  return (
    <>
      <ATMCard
        title="Credit Card"
        type={CardType.MASTER}
        lastFourDigit="3425"
        isEditing={true}
      />
      <ATMCard
        title="Debit Card"
        type={CardType.VISA}
        lastFourDigit="3425"
        isEditing={true}
      />
      <button onClick={toggleWindowVisibility}>
        <AddPaymentMethod />
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
          {/* <div className="bg-white rounded-lg p-4" ref={formRef}> */}
          <div
            className="relative rounded-lg bg-white p-80 pb-60"
            ref={formRef}
          >
            <form className="absolute left-0 top-0">
              <AddPaymentForm />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditableCards;
