import React from "react";

const LoadingShimmer = ({
  count = 8,
  type = "card",
  className = "",
  gridClassName = "",
}) => {
  const renderCardShimmer = (_, index) => (
    <div
      key={index}
      className="rounded-2xl border border-gray-200 dark:border-slate-700 p-4 animate-pulse bg-white dark:bg-slate-900"
    >
      {/* Image */}
      <div className="w-full h-[240px] rounded-xl bg-gray-200 dark:bg-slate-700"></div>

      {/* Content */}
      <div className="mt-4 space-y-3">
        <div className="h-4 w-24 rounded bg-gray-200 dark:bg-slate-700"></div>

        <div className="h-5 w-[80%] rounded bg-gray-200 dark:bg-slate-700"></div>

        <div className="space-y-2">
          <div className="h-3 w-full rounded bg-gray-200 dark:bg-slate-700"></div>
          <div className="h-3 w-[90%] rounded bg-gray-200 dark:bg-slate-700"></div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="h-8 w-20 rounded-full bg-gray-200 dark:bg-slate-700"></div>

          <div className="h-4 w-16 rounded bg-gray-200 dark:bg-slate-700"></div>
        </div>

        <div className="flex gap-2 pt-3">
          <div className="h-10 flex-1 rounded-full bg-gray-200 dark:bg-slate-700"></div>
          <div className="h-10 flex-1 rounded-full bg-gray-200 dark:bg-slate-700"></div>
        </div>
      </div>
    </div>
  );

  const renderTextShimmer = (_, index) => (
    <div
      key={index}
      className="space-y-3 animate-pulse"
    >
      <div className="h-5 w-[60%] rounded bg-gray-200 dark:bg-slate-700"></div>
      <div className="h-4 w-full rounded bg-gray-200 dark:bg-slate-700"></div>
      <div className="h-4 w-[90%] rounded bg-gray-200 dark:bg-slate-700"></div>
      <div className="h-4 w-[70%] rounded bg-gray-200 dark:bg-slate-700"></div>
    </div>
  );

  return (
    <div
      className={`
        ${
          type === "card"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            : "space-y-4"
        }
        ${gridClassName}
        ${className}
      `}
    >
      {Array.from({ length: count }).map((_, index) =>
        type === "card"
          ? renderCardShimmer(_, index)
          : renderTextShimmer(_, index),
      )}
    </div>
  );
};

export default LoadingShimmer;