import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

interface PaginationProps {
    totalPages: number;
    loadingPage?: number | null;
    setLoadingPage?: (page: number | null) => void;
}

export const Pagination = ({ totalPages, loadingPage, setLoadingPage }: PaginationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;

  const updatePage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setLoadingPage?.(newPage);
    const params = new URLSearchParams(searchParams);
    params.set("page", String(newPage));
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex justify-between items-center mt-4">
      <Button
        type="button"
        disabled={page <= 1}
        onClick={() => updatePage(page - 1)}
        className="px-4 py-2 border rounded"
      >
        {loadingPage === page - 1 ? (
          <div className="animate-spin border-2 border-gray-500 border-t-transparent rounded-full w-5 h-5"/>
        ) : (
          <>Previous</>
        )}
      </Button>
      <span>Page {page} of {totalPages}</span>
      <Button
        type="button"
        disabled={page >= totalPages}
        onClick={() => updatePage(page + 1)}
        className="px-4 py-2 border rounded"
      >  {loadingPage === page + 1 ? (
        <div className="animate-spin border-2 border-gray-500 border-t-transparent rounded-full w-5 h-5"/>
      ) : (
          <>Next</>)}
      </Button>
    </div>
  );
};
