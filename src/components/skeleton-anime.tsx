import { Card, CardContent, CardHeader } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export default function SkeletonAnime() {
  return (
    <Card className="flex">
      <CardHeader className="p-0">
        <Skeleton className="h-full w-[150px] xl:w-[200px]" />
      </CardHeader>
      <CardContent className="p-4">
        <Skeleton className="mb-2 h-6 w-3/4" />
        <div className="mb-4 flex flex-wrap gap-2">
          {[...Array(3)].map((_, index) => (
            <Skeleton key={index} className="h-4 w-16" />
          ))}
        </div>
        <div className="mb-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="mt-2 h-4 w-full" />
          <Skeleton className="mt-2 h-4 w-3/4" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-9 w-16" />
          <Skeleton className="h-9 w-16" />
        </div>
      </CardContent>
    </Card>
  );
}
