import type { ReactNode } from "react";
import React from "react";
import Footer from "../../dashboard/Footer";
import Navbar from "../../navbar/Navbar";

interface LayoutProps {
  children: ReactNode;
  className?: string;
  bg?: string;
  navBarSearched?: (searchText: string) => void;
}

function Layout(props: LayoutProps) {
  const handleSearch = (search: string) => {
    if (props.navBarSearched) props.navBarSearched(search);
  };
  return (
    <>
      <Navbar onSearch={handleSearch} />
      <main className={`${props.className} ${props.bg && `bg-[${props.bg}]`}`}>
        {props.children}
      </main>
      <Footer />
    </>
  );
}

export default Layout;
