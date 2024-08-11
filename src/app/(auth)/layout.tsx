import React from "react";

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <p>AuthLayout</p>
      {children}
    </div>
  );
};

export default AuthLayout;
