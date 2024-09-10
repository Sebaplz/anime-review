import React from "react";

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex min-h-screen items-center justify-center text-black">
      <div className="md:mx-25 rounded-md bg-white md:flex">
        <img
          src="/images/login-img-web.webp"
          alt="imagen anime"
          className="hidden rounded-l-lg border-transparent lg:flex"
        />
        <img
          src="/images/login-img-tablet.webp"
          alt="imagen anime"
          className="hidden rounded-l-lg border-transparent md:flex lg:hidden"
        />

        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
