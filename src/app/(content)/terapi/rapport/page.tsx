import { Breadcrumbs } from "@/components/elements/breadcrumbs";
import { getPossibleDrugPhenotypes } from "@/data/drug";
import { PhenotypeForm } from "./phenotype-form";

export default async function RapportPage({
  searchParams,
}: {
  searchParams: Promise<{ legemidler?: string }>;
}) {
  const { legemidler } = await searchParams;
  const { data } = await getPossibleDrugPhenotypes(
    legemidler?.split(",") ?? [],
  );

  const searchLink = `/terapi?legemidler=${legemidler?.split(",").join(",")}`;

  return (
    <div className="px-3">
      <div className="mx-auto mb-12 mt-2 max-w">
        <Breadcrumbs
          current="Rapport"
          crumbs={[
            { title: "Terapiområde", href: "/terapi" },
            { title: "Rapport", href: "/terapi/rapport" },
          ]}
        />
        <div className="mt-[36px] grid gap-4 md:grid-cols-2">
          <aside className="md:sticky md:top-[calc(var(--header)+39px)] md:max-w-[453px]">
            <h1 className="text-[40px] font-medium leading-[1.35] -tracking-[0.2px] text-blue-dark-muted">
              Legemidler
            </h1>
            <div className="mt-6">
              <div className="rounded-lg bg-white p-[15px]">
                <div>
                  <p className="text-[16px] font-semibold uppercase leading-[1.55] tracking-[0.32px] text-blue-dark">
                    Valgte legemidler
                  </p>
                  <div className="mt-3 flex flex-wrap gap-[5px] rounded-lg border border-border p-[5px]">
                    {data.drugs.map((item) => {
                      return (
                        <button
                          className="flex items-center gap-2 rounded-lg bg-blue-light-muted px-[15px] pb-[10px] pt-[7.5px] font-mono text-[18px] leading-[1.6] text-blue-dark"
                          key={item._id}
                        >
                          <span>{item.name}</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              d="M4.26671 12.6666L3.33337 11.7333L7.06671 7.99998L3.33337 4.26665L4.26671 3.33331L8.00004 7.06665L11.7334 3.33331L12.6667 4.26665L8.93337 7.99998L12.6667 11.7333L11.7334 12.6666L8.00004 8.93331L4.26671 12.6666Z"
                              fill="currentColor"
                            />
                          </svg>
                        </button>
                      );
                    })}
                  </div>
                </div>
                <PhenotypeForm searchLink={searchLink} genes={data.genes} />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
