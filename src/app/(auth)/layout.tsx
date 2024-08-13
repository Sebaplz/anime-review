import React from "react";

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="md:flex rounded-md bg-white md:mx-25 ">
      <img src="https://e1.pxfuel.com/desktop-wallpaper/957/751/desktop-wallpaper-sakurasounopetnakanojo-mashiro-shiina-mobile-thumbnail.jpg" alt="" className="lg:flex rounded-l-lg border-transparent hidden" />
      <img src="https://prodigits.co.uk/thumbs/wallpapers/p2/anime/16/349ac9c512399416.jpg" alt="" className="md:flex rounded-l-lg border-transparent lg:hidden hidden" />
      {children}
      
    </div>
  );
};

export default AuthLayout;
