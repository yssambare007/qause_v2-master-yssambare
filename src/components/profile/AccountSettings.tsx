import Image from "next/image";
import ATMCard, { CardType } from "./ATMCard";
import EditableContainer from "./EditableContainer";
import PlainCard from "./PlainCard";
import Table from "./Table";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";
import TableHeaderItem from "./TableHeaderItem";
import TableRow from "./TableRow";
import TableRowItem from "./TableRowItem";
import Badge, { BadgeType } from "./Badge";
import { useState } from "react";
import EditableCards from "./EditableCards";
import EditableBillingInfo from "./EditableBillingInfo";
import EditableInvoiceTable from "./EditableInvoiceTable";
import { useQuery } from "react-query";
import { getPlans, getSavedCards } from "../../utils/apis/profile/Index";

function AccountSettings() {
  const { data } = useQuery("getPlans", getPlans);
  const { data: cards } = useQuery("getCards", getSavedCards);

  const [editingCard, setIsEditingCard] = useState(false);
  const [editingBilling, setIsEditingBilling] = useState(false);
  const [name, setName] = useState<string>("Viswanath");
  const [address, setAddress] = useState<string>("Bengaluru, Karnataka, India");
  const [phone, setPhone] = useState<string>("8928878973");
  const [email, setEmail] = useState<string>("abcxyz@gmail.com");
  const [isEditingInvoice, setIsEditingInvoice] = useState<boolean>(false);
  const submitBillingInfo = (
    name: string,
    address: string,
    phone: string,
    email: string
  ): void => {
    setName(name);
    setAddress(address);
    setPhone(phone);
    setEmail(email);
    setIsEditingBilling(false);
  };

  return (
    <div>
      <h2 className="mb-1 font-extrabold">My Plan</h2>
      <div className="rounded-lg border border-gray-300 px-6 py-3">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(380px,auto))] gap-2">
          <PlainCard
            buttonText={
              data && data.data[1]?.isActive === true
                ? "Cancel Subscription"
                : "Upgrade Plan"
            }
            title={data && data.data[0]?.planType}
            subTitle={
              data && data.data[0]?.isActive
                ? data.data[0]?.remainingDays + " days remaining"
                : "NA"
            }
            sideText={data && "Free"}
          />
          <PlainCard
            backgroundColor="#172B4D"
            buttonColor="#ffffff"
            buttonTextColor="#000000"
            textColor="#ffffff"
            borderColor="#172B4D"
            buttonText={
              data && data.data[1]?.isActive === true
                ? "Cancel Subscription"
                : "Upgrade Plan"
            }
            title={data && data.data[1]?.planType}
            subTitle={
              data && data.data[1]?.isActive
                ? data.data[1]?.remainingDays + " days remaining"
                : "NA"
            }
            sideText={data && data.data[1]?.amountRequired}
          />
        </div>

        <h2 className="mt-6 font-extrabold">Enable Auto Renew</h2>
        <p className="text-[#767D89]">
          This option,if checked,it will renew your subscription automaticallly
        </p>
      </div>

      <EditableContainer
        className="mt-3"
        onEdit={() => {
          setIsEditingCard((editing) => !editing);
        }}
        editing={editingCard}
      >
        <p className="mb-3 font-extrabold">Payment Method</p>
        <div className="flex cursor-pointer gap-5">
          {!editingCard ? (
            <>
              {cards?.data &&
                cards.data.length > 0 &&
                cards.data.map((data: any, index: number) => {
                  return (
                    <ATMCard
                      key={index}
                      title="Credit Card"
                      type={data?.cardType?.toUpperCase()}
                      lastFourDigit={data?.cardNumber}
                      isEditing={editingCard}
                    />
                  );
                })}
            </>
          ) : null}
        </div>
        <>
          {editingCard && (
            <button onClick={() => setIsEditingCard(false)}>Cancel</button>
          )}
        </>
      </EditableContainer>

      <EditableContainer
        className="mt-3"
        onEdit={() => setIsEditingBilling((prevEditing) => !prevEditing)}
        editing={editingBilling}
      >
        {!editingBilling ? (
          <>
            <p className="font-extrabold">Billing Information</p>
            <div className="grid grid-cols-2">
              <div className="my-3">
                <p className="text-[#767D89]">Name</p>
                <p>{name}</p>
              </div>
              <div className="my-3">
                <p className="text-[#767D89]">Address</p>
                <p>{address}</p>
              </div>
              <div className="my-3">
                <p className="text-[#767D89]">Phone Number</p>
                <p>{phone}</p>
              </div>
              <div className="my-3">
                <p className="text-[#767D89]">Email Id</p>
                <p>{email}</p>
              </div>
            </div>
          </>
        ) : (
          <>
            <EditableBillingInfo
              name={name}
              address={address}
              phone={phone}
              email={email}
              onSubmit={submitBillingInfo}
            />
            <br />
            <button onClick={() => setIsEditingBilling(false)}>Cancel</button>
          </>
        )}
      </EditableContainer>

      <EditableContainer
        className="mt-3"
        onEdit={() => setIsEditingInvoice((prevEditing) => !prevEditing)}
        editing={isEditingInvoice}
      >
        <>
          {!isEditingInvoice ? (
            <>
              <p className="mb-4 font-extrabold">All Invoices</p>
              <Table>
                <TableHeader columns={12} className="gap-x-1.5">
                  <TableHeaderItem span="2/4">Invoice Id</TableHeaderItem>
                  <TableHeaderItem span="4/7">Date</TableHeaderItem>
                  <TableHeaderItem span="7/8">Amount</TableHeaderItem>
                  <TableHeaderItem span="8/10">Status</TableHeaderItem>
                  <TableHeaderItem
                    span="10/14"
                    className="self-center justify-self-center"
                  >
                    <div
                      className="flex cursor-pointer rounded-full bg-[#ffffff] px-4 py-3 text-sm text-[#000000] drop-shadow-md"
                      style={{
                        width: "152.6px",
                      }}
                    >
                      Download All
                      <Image
                        src="/images/profile/downloadIcon.svg"
                        alt="download icon"
                        height={15.7}
                        width={17.3}
                        className="ms-3"
                      />
                    </div>
                  </TableHeaderItem>
                </TableHeader>

                <TableBody>
                  <TableRow
                    columns={12}
                    className="items-center justify-center gap-x-1.5 py-3"
                  >
                    <TableRowItem span="2/4">#12345</TableRowItem>
                    <TableRowItem span="4/7">14/09/2023</TableRowItem>
                    <TableRowItem span="7/8">₹5000</TableRowItem>
                    <TableRowItem span="8/10" className="place-self-start">
                      <Badge text="On hold" type={BadgeType.STALE} />
                    </TableRowItem>
                    <TableRowItem
                      span="10/14"
                      className="self-center justify-self-center"
                    >
                      <div className="flex cursor-pointer items-center justify-center rounded-full bg-[#fff] py-2 pe-4 ps-1 drop-shadow-md">
                        <Image
                          src="/images/profile/downloadIcon.svg"
                          alt="download icon"
                          height={15.7}
                          width={17.3}
                          className="ms-3"
                        />
                      </div>
                    </TableRowItem>
                  </TableRow>
                  <TableRow
                    columns={12}
                    className="items-center justify-center gap-x-1.5 py-3"
                  >
                    <TableRowItem span="2/4">#12345</TableRowItem>
                    <TableRowItem span="4/7">14/09/2023</TableRowItem>
                    <TableRowItem span="7/8">₹5000</TableRowItem>
                    <TableRowItem span="8/10" className="place-self-start">
                      <Badge text="On hold" type={BadgeType.STALE} />
                    </TableRowItem>
                    <TableRowItem
                      span="10/14"
                      className="self-center justify-self-center"
                    >
                      <div className="flex cursor-pointer items-center justify-center rounded-full bg-[#fff] py-2 pe-4 ps-1 drop-shadow-md">
                        <Image
                          src="/images/profile/downloadIcon.svg"
                          alt="download icon"
                          height={15.7}
                          width={17.3}
                          className="ms-3"
                        />
                      </div>
                    </TableRowItem>
                  </TableRow>
                  <TableRow
                    columns={12}
                    className="items-center justify-center gap-x-1.5 py-3"
                  >
                    <TableRowItem span="2/4">#12345</TableRowItem>
                    <TableRowItem span="4/7">14/09/2023</TableRowItem>
                    <TableRowItem span="7/8">₹5000</TableRowItem>
                    <TableRowItem span="8/10" className="place-self-start">
                      <Badge text="Failed" type={BadgeType.FAILED} />
                    </TableRowItem>
                    <TableRowItem
                      span="10/14"
                      className="self-center justify-self-center"
                    >
                      <div className="flex cursor-pointer items-center justify-center rounded-full bg-[#fff] py-2 pe-4 ps-1 drop-shadow-md">
                        <Image
                          src="/images/profile/downloadIcon.svg"
                          alt="download icon"
                          height={15.7}
                          width={17.3}
                          className="ms-3"
                        />
                      </div>
                    </TableRowItem>
                  </TableRow>
                  <TableRow
                    columns={12}
                    className="items-center justify-center gap-x-1.5 py-3"
                  >
                    <TableRowItem span="2/4">#12345</TableRowItem>
                    <TableRowItem span="4/7">14/09/2023</TableRowItem>
                    <TableRowItem span="7/8">₹5000</TableRowItem>
                    <TableRowItem span="8/10" className="place-self-start">
                      <Badge text="Pending" type={BadgeType.WARNING} />
                    </TableRowItem>
                    <TableRowItem
                      span="10/14"
                      className="self-center justify-self-center"
                    >
                      <div className="flex cursor-pointer items-center justify-center rounded-full bg-[#fff] py-2 pe-4 ps-1 drop-shadow-md">
                        <Image
                          src="/images/profile/downloadIcon.svg"
                          alt="download icon"
                          height={15.7}
                          width={17.3}
                          className="ms-3"
                        />
                      </div>
                    </TableRowItem>
                  </TableRow>
                  <TableRow
                    columns={12}
                    className="items-center justify-center gap-x-1.5 py-3"
                  >
                    <TableRowItem span="2/4">#12345</TableRowItem>
                    <TableRowItem span="4/7">14/09/2023</TableRowItem>
                    <TableRowItem span="7/8">₹5000</TableRowItem>
                    <TableRowItem span="8/10" className="place-self-start">
                      <Badge text="Complete" type={BadgeType.NORMAL} />
                    </TableRowItem>
                    <TableRowItem
                      span="10/14"
                      className="self-center justify-self-center"
                    >
                      <div className="flex cursor-pointer items-center justify-center rounded-full bg-[#fff] py-2 pe-4 ps-1 drop-shadow-md">
                        <Image
                          src="/images/profile/downloadIcon.svg"
                          alt="download icon"
                          height={15.7}
                          width={17.3}
                          className="ms-3"
                        />
                      </div>
                    </TableRowItem>
                  </TableRow>
                </TableBody>
              </Table>
            </>
          ) : (
            <>
              <EditableInvoiceTable />
              <br />
              <button onClick={() => setIsEditingInvoice(false)}>Cancel</button>
            </>
          )}
        </>
      </EditableContainer>
    </div>
  );
}

export default AccountSettings;
