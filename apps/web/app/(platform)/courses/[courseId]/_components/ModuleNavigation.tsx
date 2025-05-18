import { Button } from "@repo/ui/button";
import { RiArrowLeftFill, RiArrowRightFill } from "react-icons/ri";

interface ModuleNavigationProps {
  onPrevious: () => void;
  onNext: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
  previousTitle?: string;
  nextTitle?: string;
}

export function ModuleNavigation({
  onPrevious,
  onNext,
  hasPrevious,
  hasNext,
  previousTitle,
  nextTitle,
}: ModuleNavigationProps) {
  return (
    <div className="flex justify-between items-center gap-4">
      <button
        onClick={onPrevious}
        disabled={!hasPrevious}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors
          ${hasPrevious
          ? 'hover:bg-gray-200 bg-gray-100 dark:bg-[#29292c] dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
          : 'opacity-50 cursor-not-allowed text-gray-400 dark:text-gray-600'}`}
      >
        <RiArrowLeftFill className="w-5 h-5" />
        <div className="text-left">
          <div className="text-sm font-medium">Previous</div>
          {previousTitle && <div className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[200px]">{previousTitle}</div>}
        </div>
      </button>

      <button
        onClick={onNext}
        disabled={!hasNext}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors
          ${hasNext
          ? 'bg-[#10B981] hover:bg-[#10b981e4] text-white'
          : 'opacity-50 cursor-not-allowed text-gray-400 dark:text-gray-600'}`}
      >
        <div className="text-right">
          <div className="text-sm font-medium">Next</div>
          {nextTitle && <div className="text-xs text-white truncate max-w-[200px]">{nextTitle}</div>}
        </div>
        <RiArrowRightFill className="w-5 h-5" />
      </button>
    </div>
  );
}
