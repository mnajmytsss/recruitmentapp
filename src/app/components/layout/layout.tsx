import React from "react";
import WithSubnavigation from "@/app/components/navbar/navbar";
import SmallWithLogoLeft from "@/app/components/footer/footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <WithSubnavigation />
        <main>{children}</main>
      <SmallWithLogoLeft />
    </>
  );
};

export default Layout;
