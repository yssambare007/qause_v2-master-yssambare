import React, { useState } from "react";
import CreditCard from "../../../public/images/profile/creditCard.svg";
import AddButtonCard from "../../../public/images/profile/addButtonCard.svg";
import EditablePaymentFormBadge from "./EditablePaymentFormBadge";
const AddPaymentForm = () => {
  const [name, setName] = useState<string>("Viswanath B");
  const [cardNumber, setCardNumber] = useState<string>("1234 5678 9012 3456");
  const [date, setDate] = useState<string>("MM/YY");
  const [cvv, setCvv] = useState<string>("000");
  const [isChecked, setIsChecked] = useState<boolean>(false);
  return (
    <>
      <div className="font-inter text-2x1 leading-[84, 48%] pl-8 pt-10 font-semibold text-black">
        Add Payment Method
      </div>
      <EditablePaymentFormBadge
        title="Full Name"
        text={name}
        setText={setName}
        width="570px"
      />
      <EditablePaymentFormBadge
        title="Card Number"
        text={cardNumber}
        setText={setCardNumber}
        image={<CreditCard />}
        width="570px"
      />
      <div className="flex gap-3">
        <EditablePaymentFormBadge
          title="Expiry Date"
          text={date}
          setText={setDate}
          width="255.422px"
        />
        <EditablePaymentFormBadge
          title="CVV"
          text={cvv}
          setText={setCvv}
          width="255.422px"
        />
      </div>
      <div className="mt-5 flex">
        <div className="relative ml-8 mr-0">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
            className="mt-0.5 h-5 w-5 flex-shrink-0 p-2"
          />
        </div>
        <div>
          <p className="font-helvetica pl-2 text-base font-normal leading-[142.857%] text-black">
            Securely save this card for my later purchase
          </p>
        </div>
      </div>
      <div className="relative">
        <AddButtonCard className="h-100 w-200 ml-2 mt-8 pl-5" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          <p className="font-inter relative mb-4 mt-3 text-2xl font-semibold leading-[84.48%] text-white">
            Add Card
          </p>
        </div>
      </div>
    </>
  );
};

export default AddPaymentForm;
