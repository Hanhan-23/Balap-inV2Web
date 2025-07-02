import Link from "next/link";

export default function Error401GlassMinimal() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#F7F9FA] relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        {/* <div className="
          size-[380px] rounded-full bg-blue-400
          blur-[90px] opacity-70
        " />
        <div className="
          absolute size-[300px] rounded-full bg-blue-500
          blur-[70px] opacity-60
        " />
        <div className="
          absolute size-[190px] rounded-full bg-blue-600
          blur-[50px] opacity-40
        " /> */}
      </div>

      <div className="relative z-10 flex flex-col items-center
        bg-white/30 backdrop-blur-lg rounded-3xl shadow-xl px-10 py-8 min-w-[320px]">
        <span className="select-none text-[7rem] font-extrabold text-blue-600 tracking-tight mb-2 drop-shadow-[0_2px_24px_rgba(59,130,246,0.14)]">
          401
        </span>
        <span className="text-base font-medium text-slate-800 mb-1 tracking-tight drop-shadow-[0_1px_6px_rgba(59,130,246,0.17)]">
          Unauthorized Access
        </span>
        <span className="text-xs text-slate-600 mb-5 drop-shadow-[0_1px_6px_rgba(59,130,246,0.17)]">
          Anda harus login untuk mengakses halaman ini.
        </span>
        <Link
          href="/login"
          className="px-3 py-2 rounded-full text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white duration-300 bg-transparent transition text-sm font-semibold shadow-md"
        >
          Kembali ke Login
        </Link>
      </div>
    </div>
  );
}
