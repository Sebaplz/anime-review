import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorViewProps {
  error: Error;
}

export default function ErrorView({ error }: ErrorViewProps) {
  return (
    <div
      className="flex items-center justify-center p-4"
      style={{ height: `calc(100vh - 88px)` }}
    >
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <AlertCircle className="h-6 w-6" />
            <span>Ha ocurrido un error</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-gray-600">
            Lo sentimos, ha ocurrido un error inesperado. Por favor, intenta de
            nuevo o contacta al soporte si el problema persiste.
          </p>
          <div className="rounded-md bg-red-50 p-4">
            <p className="text-sm font-medium text-red-800">
              Detalles del error:
            </p>
            <p className="mt-2 text-sm text-red-700">{error.message}</p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 sm:flex-row sm:justify-end">
          <Button
            variant="outline"
            onClick={() => window.location.reload()}
            className="w-full sm:w-auto"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Recargar página
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
