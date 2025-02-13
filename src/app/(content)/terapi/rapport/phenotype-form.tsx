"use client";

import { generateReport } from "@/lib/actions";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useTransition } from "react";
import isEqual from "lodash/isEqual";
import sortBy from "lodash/sortBy";
import Link from "next/link";
import { PossibleDrugPhenotypesResult } from "@/sanity/types";

type PhenotypeFormProps = PossibleDrugPhenotypesResult["genes"][number];

export function PhenotypeForm({
  genes,
  searchLink,
}: {
  genes: PhenotypeFormProps[];
  searchLink: string;
}) {
  const [isPending, startTransition] = useTransition();
  const [selectedGenes, setSelectedGenes] = useState<
    {
      name: string;
      combination: string[];
      result: string | null;
    }[]
  >(
    genes.map((gene) => ({
      name: gene.id.current,
      combination: [],
      result: "",
    })),
  );

  function onToggleGene(
    gene: string,
    value: string,
    index: number,
    result: string | null,
  ) {
    setSelectedGenes((prev) => {
      const current = prev.find((item) => item.name === gene);

      if (current) {
        current.combination[index] = value;

        return prev.map((item) =>
          item.name === gene
            ? {
                ...item,
                combination: current.combination,
                result,
              }
            : item,
        );
      }

      return prev;
    });
  }
  function onFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    startTransition(() => {
      generateReport(selectedGenes);
    });
  }

  return (
    <div className="mt-6">
      <p className="text-[16px] font-semibold uppercase leading-[1.55] tracking-[0.32px] text-blue-dark">
        Pasientens genvarianter
      </p>
      <form onSubmit={onFormSubmit} className="mt-[15px]">
        <div className="space-y-6">
          {genes.map((item) => {
            return (
              <div key={item.id.current}>
                <p className="font-mono text-[16px] font-semibold uppercase leading-normal tracking-[0.32px] text-blue-dark">
                  {item.name}
                </p>
                <PhenotypeSelector
                  onToggleGene={onToggleGene}
                  selectedAlleles={
                    selectedGenes.find((gene) => gene.name === item.id.current)
                      ?.combination ?? []
                  }
                  name={item.id.current}
                  alleles={item.alleles.map((allele) => ({
                    name: allele.name,
                    id: allele.id.current,
                  }))}
                  phenotypes={
                    item.phenotypes?.map((phenotype) => ({
                      combination: phenotype.alleles.map(
                        (allele) => allele.name,
                      ),
                      result: {
                        _id: phenotype.result._id,
                        result: phenotype.result.result,
                      },
                    })) ?? []
                  }
                />
              </div>
            );
          })}
        </div>
        <div className="mt-10 flex items-center justify-center gap-10">
          <Link
            href={searchLink}
            className="block w-fit rounded-lg text-[20px] font-medium leading-normal text-blue-dark underline decoration-blue-dark underline-offset-8"
          >
            Gå tilbake
          </Link>
          <button className="block w-fit rounded-lg bg-blue-light-muted px-[18px] py-[10px] text-[20px] font-medium leading-normal text-blue-dark">
            Vis rapport
          </button>
        </div>
      </form>
    </div>
  );
}

export function PhenotypeSelector({
  alleles,
  phenotypes,
  name,
  onToggleGene,
  selectedAlleles,
}: {
  alleles: { name: string; id: string }[];
  name: string;
  phenotypes: Array<{
    combination: string[];
    result?: {
      result: string;
      _id: string;
    };
  }>;
  selectedAlleles: string[];
  onToggleGene: (
    gene: string,
    value: string,
    index: number,
    result: string | null,
  ) => void;
}) {
  const result = phenotypes.find(
    (phenotype) =>
      phenotype.combination.length == selectedAlleles.length &&
      isEqual(sortBy(phenotype.combination), sortBy(selectedAlleles)),
  );

  const numberOfSelects = Math.max(
    ...(phenotypes?.map((item) => item.combination.length ?? 0) ?? []),
  );

  return (
    <div>
      <div className="flex gap-[5px]">
        {Array.from({ length: numberOfSelects }).map((_, index) => (
          <Select
            key={index}
            required
            onValueChange={(value) =>
              onToggleGene(name, value, index, result?.result?._id ?? null)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Velg allel" />
            </SelectTrigger>
            <SelectContent>
              {alleles.map((allele) => (
                <SelectItem key={allele.id} value={allele.name}>
                  {allele.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ))}
      </div>
      {result?.result && (
        <div className="mt-2.5">
          <p className="text-[16px] leading-[1.55] text-blue-dark">
            {result.result.result}
          </p>
        </div>
      )}
    </div>
  );
}
