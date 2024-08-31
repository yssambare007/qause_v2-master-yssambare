import Banner from "./Banner";
import Card from "./Card";
import CardsContainer from "./CardsContainer";
import MessageIcon from "./../../../public/images/profile/messageIcon.svg";
import WarningIcon from "./../../../public/images/profile/warningIcon.svg";
import CardSubContainer from "./CardSubContainer";
import SubContainer from "./SubContainer";
import Image from "next/image";
import Table from "./Table";
import TableHeader from "./TableHeader";
import TableHeaderItem from "./TableHeaderItem";
import TableBody from "./TableBody";
import TableRow from "./TableRow";
import TableRowItem from "./TableRowItem";

export default function MyTask() {
  return (
    <>
      <Banner />

      <CardsContainer>
        <CardSubContainer badgeCount={15}>
          <Card />
          <Card />
          <Card />
          <Card />
        </CardSubContainer>
      </CardsContainer>

      <CardsContainer title="History">
        <CardSubContainer subTitle="Pending Reviews">
          <Card
            barColor="#4AC6C6"
            backgroundColor="#E0F5F5"
            btnColor="#ffffff"
            btnTextColor="#000000"
            footerPoints={[{ text: "On Ground" }, { text: "20-02-2023" }]}
            listmarkerColor="#98DFDF"
            footerTitleIcon="/images/profile/tickMark.svg"
            cornerText="Review Pending"
            CornerIcon={MessageIcon}
            CornerTextIcon={WarningIcon}
          />
          <Card
            barColor="#4AC6C6"
            backgroundColor="#E0F5F5"
            btnColor="#ffffff"
            btnTextColor="#000000"
            footerPoints={[{ text: "On Ground" }, { text: "20-02-2023" }]}
            listmarkerColor="#98DFDF"
            footerTitleIcon="/images/profile/tickMark.svg"
            cornerText="Review Pending"
            CornerIcon={MessageIcon}
            CornerTextIcon={WarningIcon}
          />
        </CardSubContainer>
        <CardSubContainer subTitle="Reviews">
          <Card
            title="VIRUS"
            barColor="#FFCF70"
            backgroundColor="#FEE2AB"
            listmarkerColor="#FFCF70"
            btnColor="#ffffff"
            btnTextColor="#000000"
            footerPoints={[{ text: "On Ground" }, { text: "20-02-2023" }]}
            CornerIcon={MessageIcon}
            cornerIconColor={"#FFCF70"}
            cornerIconBorderColor={"#FFCF70"}
            footerTitleIcon="/images/profile/tickMarkBlack.svg"
          />
          <Card
            title="VIRUS"
            barColor="#FFCF70"
            backgroundColor="#FEE2AB"
            listmarkerColor="#FFCF70"
            btnColor="#ffffff"
            btnTextColor="#000000"
            footerPoints={[{ text: "On Ground" }, { text: "20-02-2023" }]}
            CornerIcon={MessageIcon}
            cornerIconColor={"#FFCF70"}
            cornerIconBorderColor={"#FFCF70"}
            footerTitleIcon="/images/profile/tickMarkBlack.svg"
          />
        </CardSubContainer>
      </CardsContainer>

      <CardsContainer title="Donations">
        <SubContainer subTitle="Your Donations">
          <Table>
            <TableHeader columns={12}>
              <TableHeaderItem span="2/4">
                <div className="px-4 py-3">Date</div>
              </TableHeaderItem>
              <TableHeaderItem span="4/7">
                <div className="px-4 py-3">NGO Name</div>{" "}
              </TableHeaderItem>
              <TableHeaderItem span="7/10">
                <div className="px-4 py-3">Amount</div>
              </TableHeaderItem>
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
              <TableRow columns={12}>
                <TableRowItem span="2/4">
                  <div className="px-4 py-3">24-05-2023</div>
                </TableRowItem>
                <TableRowItem span="4/7">
                  <div className="px-4 py-3">Rashmi Foundation</div>
                </TableRowItem>
                <TableRowItem span="7/10">
                  <div className="px-4 py-3">₹5000</div>
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
              <TableRow columns={12}>
                <TableRowItem span="2/4">
                  <div className="px-4 py-3">24-05-2023</div>
                </TableRowItem>
                <TableRowItem span="4/7">
                  <div className="px-4 py-3">Rashmi Foundation</div>
                </TableRowItem>
                <TableRowItem span="7/10">
                  <div className="px-4 py-3">₹5000</div>
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
              <TableRow columns={12}>
                <TableRowItem span="2/4">
                  <div className="px-4 py-3">24-05-2023</div>
                </TableRowItem>
                <TableRowItem span="4/7">
                  <div className="px-4 py-3">Rashmi Foundation</div>
                </TableRowItem>
                <TableRowItem span="7/10">
                  <div className="px-4 py-3">₹5000</div>
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
              <TableRow columns={12}>
                <TableRowItem span="2/4">
                  <div className="px-4 py-3">24-05-2023</div>
                </TableRowItem>
                <TableRowItem span="4/7">
                  <div className="px-4 py-3">Rashmi Foundation</div>
                </TableRowItem>
                <TableRowItem span="7/10">
                  <div className="px-4 py-3">₹5000</div>
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
              <TableRow columns={12}>
                <TableRowItem span="2/4">
                  <div className="px-4 py-3">24-05-2023</div>
                </TableRowItem>
                <TableRowItem span="4/7">
                  <div className="px-4 py-3">Rashmi Foundation</div>
                </TableRowItem>
                <TableRowItem span="7/10">
                  <div className="px-4 py-3">₹5000</div>
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
        </SubContainer>
      </CardsContainer>
    </>
  );
}
