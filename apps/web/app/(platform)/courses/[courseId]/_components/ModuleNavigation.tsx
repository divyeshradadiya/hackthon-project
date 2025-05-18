import { Button } from "@repo/ui/button";
import { RiArrowLeftFill, RiArrowRightFill } from "react-icons/ri";

interface ModuleNavigationProps {
  onPrevious: () => void;
  onNext: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
}

export function ModuleNavigation({ onPrevious, onNext, hasPrevious, hasNext }: ModuleNavigationProps) {
  return (
    <div className="mt-8 mb-10 flex justify-end items-center border-t border-gray-200/10 dark:border-gray-800 pt-4">
      <div className="flex gap-2">
        <Button
          variant="gray"
          className="flex items-center gap-2"
          onClick={onPrevious}
          disabled={!hasPrevious}
        >
          <RiArrowLeftFill />
          Previous
        </Button>
        <Button
          variant="whiteblue"
          className="rounded-[6px] bg-[#1155ff] dark:bg-blue-500 text-white shadow hover:bg-blue-800 dark:text-white"
          onClick={onNext}
          disabled={!hasNext}
        >
          <RiArrowRightFill />
          Next
        </Button>
      </div>
    </div>
  );
}
