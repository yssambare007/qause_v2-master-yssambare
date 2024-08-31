import React from "react";
import Image from "next/image";
import Table from "./Table";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";
import TableHeaderItem from "./TableHeaderItem";
import TableRow from "./TableRow";
import TableRowItem from "./TableRowItem";
import Badge, { BadgeType } from "./Badge";
import TrashIcon from "../../../public/images/profile/trashIcon.svg";

const EditableInvoiceTable = () => {
  return (
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
              <TableRowItem
                span="10/14"
                className="self-center justify-self-center"
              >
                <div className="flex items-center">
                  <div className="mr-[20px] cursor-pointer rounded-full bg-[#fff] py-2 pe-4 ps-1 drop-shadow-md">
                    <Image
                      src="/images/profile/downloadIcon.svg"
                      alt="download icon"
                      height={15.7}
                      width={17.3}
                      className="ms-3"
                    />
                  </div>
                  <TrashIcon />
                </div>
              </TableRowItem>
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
              <div className="flex items-center">
                <div className="mr-[20px] cursor-pointer rounded-full bg-[#fff] py-2 pe-4 ps-1 drop-shadow-md">
                  <Image
                    src="/images/profile/downloadIcon.svg"
                    alt="download icon"
                    height={15.7}
                    width={17.3}
                    className="ms-3"
                  />
                </div>
                <TrashIcon />
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
              <div className="flex items-center">
                <div className="mr-[20px] cursor-pointer rounded-full bg-[#fff] py-2 pe-4 ps-1 drop-shadow-md">
                  <Image
                    src="/images/profile/downloadIcon.svg"
                    alt="download icon"
                    height={15.7}
                    width={17.3}
                    className="ms-3"
                  />
                </div>
                <TrashIcon />
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
              <div className="flex items-center">
                <div className="mr-[20px] cursor-pointer rounded-full bg-[#fff] py-2 pe-4 ps-1 drop-shadow-md">
                  <Image
                    src="/images/profile/downloadIcon.svg"
                    alt="download icon"
                    height={15.7}
                    width={17.3}
                    className="ms-3"
                  />
                </div>
                <TrashIcon />
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
              <div className="flex items-center">
                <div className="mr-[20px] cursor-pointer rounded-full bg-[#fff] py-2 pe-4 ps-1 drop-shadow-md">
                  <Image
                    src="/images/profile/downloadIcon.svg"
                    alt="download icon"
                    height={15.7}
                    width={17.3}
                    className="ms-3"
                  />
                </div>
                <TrashIcon />
              </div>
            </TableRowItem>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};

export default EditableInvoiceTable;
