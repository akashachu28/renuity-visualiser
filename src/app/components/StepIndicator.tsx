import { Check } from "lucide-react";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
  compact?: boolean;
}

export function StepIndicator({ currentStep, totalSteps, steps, compact = false }: StepIndicatorProps) {
  if (compact) {
    return (
      <div className="flex items-center gap-6">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <div key={step} className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isCompleted
                    ? "bg-[#2A9D8F] text-white"
                    : isCurrent
                    ? "bg-[#1A3A52] text-white"
                    : "bg-[#E8E6E1] text-[#B0B0B0]"
                }`}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4" strokeWidth={3} />
                ) : (
                  <span className="text-xs font-medium">{stepNumber}</span>
                )}
              </div>
              <span
                className={`text-sm transition-colors duration-300 ${
                  isCurrent ? "text-[#1A3A52] font-semibold" : "text-[#6B6B6B]"
                }`}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between relative">
        {/* Progress line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-[#E8E6E1]" style={{ zIndex: 0 }}>
          <div
            className="h-full bg-[#2A9D8F] transition-all duration-500 ease-out"
            style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
          />
        </div>

        {/* Step circles */}
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <div key={step} className="flex flex-col items-center relative" style={{ zIndex: 1 }}>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isCompleted
                    ? "bg-[#2A9D8F] text-white"
                    : isCurrent
                    ? "bg-[#1A3A52] text-white shadow-lg"
                    : "bg-white text-[#6B6B6B] border-2 border-[#E8E6E1]"
                }`}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span className="font-medium">{stepNumber}</span>
                )}
              </div>
              <span
                className={`mt-2 text-sm transition-colors duration-300 ${
                  isCurrent ? "text-[#1A3A52] font-semibold" : "text-[#6B6B6B]"
                }`}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}