import { useEffect, useRef } from 'react';

export const useInfiniteScroll = ({
  fetchMore,
  hasNextPage,
  isFetchingNextPage,
}: {
  fetchMore: () => void;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
}) => {
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchMore();
        }
      },
      { threshold: 1 }
    );

    const current = observerRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [fetchMore, hasNextPage, isFetchingNextPage]);

  return observerRef; // ✅ Add this line
};
