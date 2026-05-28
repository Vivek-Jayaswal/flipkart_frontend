const steps = [
  "Basic Information",
  "Variants",
  "Specifications",
  "Inventory",
  "Review & Submit",
];

export const ProgressBar = () => {
  return (
    <div className="flex items-center mb-8">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center flex-1">
          <div className="flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold ${
                index === 0
                  ? "bg-blue-600 text-white"
                  : "border border-gray-300 text-gray-600 bg-white"
              }`}
            >
              {index + 1}
            </div>

            <span
              className={`text-sm ${
                index === 0 ? "text-blue-600 font-semibold" : "text-gray-500"
              }`}
            >
              {step}
            </span>
          </div>

          {index !== steps.length - 1 && (
            <div className="h-[1px] flex-1 bg-gray-300 mx-4" />
          )}
        </div>
      ))}
    </div>
  );
};
