import { Loader2 } from 'lucide-react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-[70vh] w-full">
      <Loader2 className="h-12 w-12 animate-spin text-pink-600" />
    </div>
  );
};

export default Loader;