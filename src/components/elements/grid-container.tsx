import React from "react";

export function GridContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w @container">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(175px,1fr))] gap-4 odd:last:*:[@container(calc(175px_*_4_+_3rem)_<_width_<_calc(175px_*_6_+_5rem))]:col-[2_/_span_2] last:[&:nth-child(3n_+_4)]:*:[@container(calc(175px_*_6_+_5rem)_<_width_<_calc(175px_*_8_+_7rem))]:col-[3_/_5] [&:nth-last-child(2)]:*:has-[:nth-child(3n_+_5):last-child]:[@container(calc(175px_*_6_+_5rem)_<_width_<_calc(175px_*_8_+_7rem))]:col-[2_/_4] last:[&:nth-child(4n_+_5)]:*:[@container(calc(175px_*_8_+_7rem)_<_width_<_calc(175px_*_10_+_9rem))]:col-[4_/_6] [&:nth-last-child(2)]:*:has-[:nth-child(4n_+_6):last-child]:[@container(calc(175px_*_8_+_7rem)_<_width_<_calc(175px_*_10_+_9rem))]:col-[3_/_5] [&:nth-last-child(3)]:*:has-[:nth-child(4n_+_7):last-child]:[@container(calc(175px_*_8_+_7rem)_<_width_<_calc(175px_*_10_+_9rem))]:col-[2_/_4] *:[@container(width_>=_calc(175px_*_2_+_1rem))]:col-[span_2]">
        {children}
      </div>
    </div>
  );
}
