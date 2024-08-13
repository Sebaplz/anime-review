import React from "react";

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="md:mx-25 rounded-md bg-white md:flex">
      <img
        src="https://e1.pxfuel.com/desktop-wallpaper/957/751/desktop-wallpaper-sakurasounopetnakanojo-mashiro-shiina-mobile-thumbnail.jpg"
        alt=""
        className="hidden rounded-l-lg border-transparent lg:flex"
      />
      <img
        src="https://prodigits.co.uk/thumbs/wallpapers/p2/anime/16/349ac9c512399416.jpg"
        alt=""
        className="hidden rounded-l-lg border-transparent md:flex lg:hidden"
      />
      {children}
    </div>
  );
};

export default AuthLayout;
