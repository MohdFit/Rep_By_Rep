function Pill({ label, onClick, className = "" }) {
  return (
    <div className={`p-[2px] rounded-full ${className}`}>
      <button
        type="button"
        onClick={onClick}
        className="
          h-11 px-6 rounded-full border-2 border-orange-400
          bg-white text-[#0E1830]
          flex items-center justify-center gap-2
          min-w-[170px]
          font-medium tracking-wide
          shadow-sm hover:bg-orange-50 hover:scale-105
          transition-transform duration-200
        "
      >
        {label}
      </button>
    </div>
  );
}

export default function FilterPills() {
  return (
    <div className="w-full flex justify-start gap-3 -translate-y-4 mt-4">
      <Pill
        label="All Programs"
        onClick={() => {}}
        className="min-w-[180px]"
      />
      <Pill
        label="Featured"
        onClick={() => {}}
        className="min-w-[180px]"
      />
    </div>
  );
}
