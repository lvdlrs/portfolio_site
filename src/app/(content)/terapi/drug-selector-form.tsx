"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { useState } from "react";

type DrugSelectorFormProps = {
  initialDrugs: string[];
  data: {
    _id: string;
    name: string;
    drugs: {
      _id: string;
      name: string;
      slug: string;
      productNames: string[];
    }[];
  }[];
};

export function DrugSelectorForm(props: DrugSelectorFormProps) {
  console.log(props.initialDrugs);
  const initialDrugs = props.data
    .map((item) =>
      item.drugs
        .filter((drug) => props.initialDrugs.includes(drug.slug))
        .map((drug) => ({
          value: drug.slug,
          label: drug.name,
        })),
    )
    .flat();

  const [selectedDrugs, setSelectedDrugs] =
    useState<{ label: string; value: string }[]>(initialDrugs);

  function onDrugSelect(drug: { label: string; value: string }) {
    setSelectedDrugs((prev) => {
      if (prev.some((d) => d.value === drug.value)) {
        return prev.filter((d) => d.value !== drug.value);
      }
      return [...prev, drug];
    });
  }

  const isSelectingDrugs = selectedDrugs.length > 0;

  const searchLink = isSelectingDrugs
    ? `/terapi/rapport?legemidler=${selectedDrugs.map((drug) => drug.value).join(",")}`
    : undefined;

  return (
    <div className="grid items-start gap-8 md:grid-cols-2">
      <aside className="md:sticky md:top-[calc(var(--header)+39px)] md:max-w-[453px]">
        <h1 className="text-[40px] font-medium leading-[1.35] -tracking-[0.2px] text-blue-dark-muted">
          Legemidler
        </h1>
        {!isSelectingDrugs && (
          <div className="mt-3">
            <p className="w-fit rounded-lg bg-yellow px-[15px] pb-[10px] pt-[7.5px] font-mono font-semibold leading-[1.5]">
              Velg minimum ett legemiddel
            </p>
          </div>
        )}
        {isSelectingDrugs && (
          <div className="mt-6">
            <div className="rounded-lg bg-white p-[15px]">
              <p className="text-[16px] font-semibold uppercase leading-[1.55] tracking-[0.32px] text-blue-dark">
                Valgte legemidler
              </p>
              <div className="mt-3 flex flex-wrap gap-[5px] rounded-lg border border-border p-[5px]">
                {selectedDrugs.map((item) => {
                  return (
                    <button
                      className="flex items-center gap-2 rounded-lg bg-blue-light-muted px-[15px] pb-[10px] pt-[7.5px] font-mono text-[18px] leading-[1.6] text-blue-dark"
                      onClick={() => onDrugSelect(item)}
                      key={item.value}
                    >
                      <span>{item.label}</span>
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
            <Link
              href={searchLink ?? "#"}
              className="mx-auto mt-3 block w-fit rounded-lg bg-blue-light-muted px-[18px] py-[10px] text-[20px] font-medium leading-normal text-blue-dark"
            >
              Gå videre
            </Link>
          </div>
        )}
      </aside>
      <Accordion type="multiple" className="grid gap-2">
        {props.data.map((category) => {
          return (
            <AccordionItem key={category._id} value={category._id}>
              <AccordionTrigger>{category.name}</AccordionTrigger>
              <AccordionContent className="px-2.5 pb-2.5">
                <div className="grid gap-3">
                  {category.drugs.map((drug) => {
                    return (
                      <label
                        key={drug._id}
                        htmlFor={drug._id}
                        className="flex items-start gap-[15px] rounded-lg border border-blue-light-muted py-[15px] pl-[15px] pr-[18px]"
                      >
                        <input
                          type="checkbox"
                          id={drug._id}
                          className="mt-1 size-5 shrink-0"
                          checked={selectedDrugs.some(
                            (d) => d.value === drug.slug,
                          )}
                          onChange={() =>
                            onDrugSelect({ label: drug.name, value: drug.slug })
                          }
                        />
                        <div>
                          <p className="text-[18px] font-medium text-blue-dark">
                            {drug.name}
                          </p>
                          <div className="font-mono text-[18px] leading-[1.6] text-blue-dark">
                            <p>{drug.productNames?.join(", ")}</p>
                          </div>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
