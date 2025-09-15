interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-pink-600">
          ステップ {currentStep} / {totalSteps}
        </span>
        <span className="text-sm text-gray-500">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="w-full bg-pink-100 rounded-full h-3 shadow-inner">
        <div
          className="bg-gradient-to-r from-pink-400 to-rose-400 h-3 rounded-full transition-all duration-500 ease-out shadow-sm"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex justify-between mt-2">
        {Array.from({ length: totalSteps }, (_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index < currentStep
                ? "bg-pink-500 shadow-sm"
                : index === currentStep - 1
                ? "bg-pink-400 ring-2 ring-pink-200"
                : "bg-gray-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
}