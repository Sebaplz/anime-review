import Navbar from "@/components/navbar";
import React from "react";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";

const AdminLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await auth();
  if (session?.user.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <>
      <Navbar />
      {children}
      <Toaster />
    </>
  );
};

export default AdminLayout;
