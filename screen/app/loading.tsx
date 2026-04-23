export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden">
      
      {/* Soft glowing background */}
      <div className="absolute w-[400px] h-[400px] bg-yellow-200/30 blur-3xl rounded-full animate-pulse" />
      <div className="absolute w-[300px] h-[300px] bg-blue-200/20 blur-2xl rounded-full animate-ping" />

      {/* Main loader */}
      <div className="flex flex-col items-center gap-6 z-10 text-center">

        {/* Cross animation */}
        <div className="text-5xl animate-bounce">✝️</div>

        {/* Short gospel message */}
        <div className="text-gray-700 text-lg font-medium tracking-wide">
          “Wait in His presence”
        </div>

        {/* Sub text */}
        <div className="text-sm text-gray-400">
          Faith • Hope • Salvation
        </div>

        {/* Spinner */}
        <div className="w-10 h-10 border-4 border-gray-200 border-t-yellow-500 rounded-full animate-spin mt-2"></div>
      </div>
    </div>
  );
}