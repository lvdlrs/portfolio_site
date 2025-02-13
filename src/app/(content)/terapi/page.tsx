import { Breadcrumbs } from "@/components/elements/breadcrumbs";
import { getCategoryDrugs } from "@/data/drug";
import { DrugSelectorForm } from "./drug-selector-form";

export default async function TherapyPage({
  searchParams,
}: {
  searchParams: Promise<{ legemidler?: string }>;
}) {
  const { legemidler } = await searchParams;
  const { data } = await getCategoryDrugs();

  const drugs = data.map((category) => ({
    ...category,
    drugs: category.drugs.map((drug) => ({
      ...drug,
      name: drug.name || "",
      slug: drug.slug?.current || "",
      productNames: drug.productNames || [],
    })),
  }));
  

  return (
    <div className="px-3">
      <div className="mx-auto mb-12 mt-2 max-w">
        <Breadcrumbs current="Terapiområde" />
        <div className="mt-[36px]">
          <DrugSelectorForm
            initialDrugs={legemidler?.split(",") ?? []}
            data={drugs}
          />
        </div>
      </div>
    </div>
  );
}
