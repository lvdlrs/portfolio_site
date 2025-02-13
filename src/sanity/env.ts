const isVite = !!import.meta.env;

export const apiVersion =
  (isVite
    ? import.meta.env.NEXT_PUBLIC_SANITY_API_VERSION
    : process.env.NEXT_PUBLIC_SANITY_API_VERSION) || "2024-10-09";

export const dataset = assertValue(
  isVite
    ? import.meta.env.NEXT_PUBLIC_SANITY_DATASET
    : process.env.NEXT_PUBLIC_SANITY_DATASET,
  "Missing environment variable: NEXT_PUBLIC_SANITY_DATASET"
);

export const projectId = assertValue(
  isVite
    ? import.meta.env.NEXT_PUBLIC_SANITY_PROJECT_ID
    : process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID"
);

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }

  return v;
}
