import React from "react";
import Footer from "../../dashboard/Footer";
import Navbar from "../../navbar/Navbar";

function DashboardLayout({ children }: any) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default DashboardLayout;
