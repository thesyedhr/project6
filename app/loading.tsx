import { LoadingBrandDisplay } from '@/components/PageLoader';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#F7F5F0] text-[#1D1B18] select-none overflow-hidden">
      <div className="flex items-center justify-center px-6 pointer-events-none">
        <LoadingBrandDisplay />
      </div>
    </div>
  );
}

