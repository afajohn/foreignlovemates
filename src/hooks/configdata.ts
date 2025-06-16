"use client";
import useSWR from "swr";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
};

export function useConfigColor() {
  const { data } = useSWR("/api/configuration", fetcher);

  document.documentElement.style.setProperty(
    "--dynamic-primary50",
    data?.[0]?.color.primary[50]
  );
  document.documentElement.style.setProperty(
    "--dynamic-primary100",
    data?.[0]?.color.primary[100]
  );
  document.documentElement.style.setProperty(
    "--dynamic-primary200",
    data?.[0]?.color.primary[200]
  );
  document.documentElement.style.setProperty(
    "--dynamic-primary300",
    data?.[0]?.color.primary[300]
  );
  document.documentElement.style.setProperty(
    "--dynamic-primary400",
    data?.[0]?.color.primary[400]
  );
  document.documentElement.style.setProperty(
    "--dynamic-primary500",
    data?.[0]?.color.primary[500]
  );
  document.documentElement.style.setProperty(
    "--dynamic-primary600",
    data?.[0]?.color.primary[600]
  );
  document.documentElement.style.setProperty(
    "--dynamic-primary700",
    data?.[0]?.color.primary[700]
  );

  document.documentElement.style.setProperty(
    "--dynamic-primary800",
    data?.[0]?.color.primary[800]
  );
  document.documentElement.style.setProperty(
    "--dynamic-primary900",
    data?.[0]?.color.primary[900]
  );

  document.documentElement.style.setProperty(
    "--dynamic-secondary50",
    data?.[0]?.color.secondary[50]
  );

  document.documentElement.style.setProperty(
    "--dynamic-secondary100",
    data?.[0]?.color.secondary[100]
  );

  document.documentElement.style.setProperty(
    "--dynamic-secondary200",
    data?.[0]?.color.secondary[200]
  );

  document.documentElement.style.setProperty(
    "--dynamic-secondary300",
    data?.[0]?.color.secondary[300]
  );

  document.documentElement.style.setProperty(
    "--dynamic-secondary400",
    data?.[0]?.color.secondary[400]
  );

  document.documentElement.style.setProperty(
    "--dynamic-secondary500",
    data?.[0]?.color.secondary[500]
  );

  document.documentElement.style.setProperty(
    "--dynamic-secondary600",
    data?.[0]?.color.secondary[600]
  );

  document.documentElement.style.setProperty(
    "--dynamic-secondary700",
    data?.[0]?.color.secondary[700]
  );
  document.documentElement.style.setProperty(
    "--dynamic-secondary800",
    data?.[0]?.color.secondary[800]
  );

  document.documentElement.style.setProperty(
    "--dynamic-secondary900",
    data?.[0]?.color.secondary[900]
  );
}
