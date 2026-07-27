import { Skeleton as SkeletonBlock } from "@/components/ui/skeleton";

export default function Skeleton() {
  return (
    <div className="p-3 border-grey-300 space-y-2">
      <h3 className="text-grey-200 font-bold text-xl">Exercise</h3>
      <div className="rounded-md bg-[#f8f9fa] border-2 border-[#e9ecef] p-4 space-y-3">
        <SkeletonBlock className="h-9 w-2/3" />
        <SkeletonBlock className="h-5 w-1/3" />
      </div>
    </div>
  );
}
