"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Pencil, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import instance from "@/lib/instance";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";

const imageUploadSchema = z.object({
  image: z
    .instanceof(File)
    .refine(
      (file) => file.size <= 5000000,
      `El tamaño máximo del archivo es 5MB.`,
    )
    .refine(
      (file) => ["image/jpeg", "image/png", "image/gif"].includes(file.type),
      "Solo se permiten archivos .jpg, .jpeg, .png y .gif.",
    ),
});

type ImageUploadSchema = z.infer<typeof imageUploadSchema>;

export default function ImageUploadButton({ onImageUpload }: any) {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const { data: session } = useSession();

  const form = useForm<ImageUploadSchema>({
    resolver: zodResolver(imageUploadSchema),
  });

  async function onSubmit(values: ImageUploadSchema) {
    setIsUploading(true);
    try {
      // 1. Subir la imagen a Cloudinary
      const cloudinaryData = new FormData();
      cloudinaryData.append("file", values.image);
      cloudinaryData.append("upload_preset", "ml_default");

      const cloudinaryResponse = await fetch(
        `https://api.cloudinary.com/v1_1/dfefrobtz/image/upload`,
        {
          method: "POST",
          body: cloudinaryData,
        },
      );

      if (!cloudinaryResponse.ok) {
        throw new Error("Error al subir la imagen a Cloudinary");
      }

      const cloudinaryResult = await cloudinaryResponse.json();
      const imageUrlCloudinary = cloudinaryResult.secure_url;
      onImageUpload(imageUrlCloudinary);

      // 2. Guardar la URL de Cloudinary en tu backend
      const response = await instance.patch(
        `/api/v1/users/${session?.user?.email}/image`,
        {
          urlImage: imageUrlCloudinary,
        },
      );

      toast({
        title: "Imagen actualizada",
        description: "Tu imagen de perfil ha sido actualizada con éxito.",
      });

      console.log("Image URL saved in backend:", response.data);
    } catch (error) {
      console.error("Error updating image:", error);
      toast({
        title: "Error",
        description:
          "Hubo un problema al actualizar tu imagen. Por favor, intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="image"
          render={({ field: { onChange, value, ...rest } }) => (
            <FormItem>
              <FormLabel>Imagen de perfil</FormLabel>
              <FormControl>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      onChange(file);
                    }
                  }}
                  className="w-full text-sm text-slate-500 file:mr-4 file:rounded-full file:border-0 file:bg-violet-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-violet-700 hover:file:bg-violet-100"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isUploading} className="w-full">
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Subiendo...
            </>
          ) : (
            <>
              Cambiar Imagen
              <Pencil className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
