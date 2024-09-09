"use client";
import { getAnimes } from "@/app/(protected)/dashboard/api";
import { useQuery } from "@tanstack/react-query";
import { CardAnime } from "./card-anime";
import ErrorView from "./error-view";
import SkeletonAnime from "./skeleton-anime";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

interface AnimeListProps {
  isAdmin: boolean;
  onDelete?: (id: number, title: string) => void;
}

export default function AnimeList({ isAdmin, onDelete }: AnimeListProps) {
  const [page, setPage] = useState(0);
  const size = 6;

  const {
    data: animeResponse,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["animes", page, size],
    queryFn: () => getAnimes(page, size),
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return (
      <div className="p-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array(size)
            .fill(0)
            .map((_, index) => (
              <SkeletonAnime key={index} />
            ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return <ErrorView error={error as Error} />;
  }

  const animes = animeResponse?.content || [];
  const totalPages = animeResponse?.page.totalPages || 0;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo(0, 0);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const totalPagesToShow = 5;
    const halfTotalPages = Math.floor(totalPagesToShow / 2);

    let startPage = Math.max(0, page - halfTotalPages);
    let endPage = Math.min(totalPages - 1, startPage + totalPagesToShow - 1);

    if (endPage - startPage + 1 < totalPagesToShow) {
      startPage = Math.max(0, endPage - totalPagesToShow + 1);
    }

    if (startPage > 0) {
      pageNumbers.push(0);
      if (startPage > 1) pageNumbers.push(-1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (endPage < totalPages - 1) {
      if (endPage < totalPages - 2) pageNumbers.push(-1);
      pageNumbers.push(totalPages - 1);
    }

    return pageNumbers;
  };

  return (
    <>
      <div className="p-4">
        {animes.length > 0 ? (
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {animes.map((anime) => (
              <CardAnime
                key={anime.id}
                anime={anime}
                onDelete={onDelete}
                isAdmin={isAdmin}
              />
            ))}
          </ul>
        ) : (
          <p>No hay animes disponibles.</p>
        )}
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(page - 1)}
              className={
                page === 0 ? "pointer-events-none opacity-50" : "cursor-pointer"
              }
            />
          </PaginationItem>
          {getPageNumbers().map((pageNumber, index) => (
            <PaginationItem key={index}>
              {pageNumber === -1 ? (
                <PaginationLink>...</PaginationLink>
              ) : (
                <PaginationLink
                  onClick={() => handlePageChange(pageNumber)}
                  isActive={pageNumber === page}
                  className="cursor-pointer"
                >
                  {pageNumber + 1}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              onClick={() => handlePageChange(page + 1)}
              className={
                page === totalPages - 1
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}
