
function Pill({ label, onClick, className = "", dark = false }) {
  return (
    <div className={`p-[2px] rounded-full ${className}`}>
      <button
        type="button"
        onClick={onClick}
        className={`
          h-11 px-6 rounded-full border-2 border-orange-400
          ${dark ? 'bg-[#222] text-white border-orange-400 hover:bg-orange-500 hover:text-white' : 'bg-white text-[#0E1830] hover:bg-orange-50'}
          flex items-center justify-center gap-2
          min-w-[140px] sm:min-w-[170px]
          font-medium tracking-wide
          shadow-sm hover:scale-105
          transition-transform duration-200
        `}
      >
        {label}
      </button>
    </div>
  );
}

export default function FilterPills({ dark = false }) {
  return (
    <div className={`w-full flex flex-wrap justify-start gap-3 -translate-y-4 mt-4`}>
      <Pill
        label="All Programs"
        onClick={() => {}}
        className="min-w-[120px] sm:min-w-[180px]"
        dark={dark}
      />
      <Pill
        label="Featured"
        onClick={() => {}}
        className="min-w-[120px] sm:min-w-[180px]"
        dark={dark}
      />
    </div>
  );
}
