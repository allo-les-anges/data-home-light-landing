import Image from "next/image"
import Link from "next/link"

const columns = [
  { title: "Product", links: [["Features", "#features"], ["Templates", "#templates"], ["Pricing", "#pricing"], ["Demo", "https://datahome.vercel.app/demo"]] },
  { title: "Modules", links: [["Property Manager", "#features"], ["AI chatbot", "#features"], ["Landing pages", "#features"], ["XML feeds", "#pricing"]] },
  { title: "Company", links: [["Partners", "#partners"], ["Contact", "#contact"], ["Privacy", "/privacy"], ["Legal", "/legal"]] },
]

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-[#080B1D] text-white">
      <div className="dh-container py-14">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="block w-fit" aria-label="Data Home">
              <Image src="/data-home-footer-logo.png" alt="Data Home" width={360} height={90} className="h-auto w-56" />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/62">Your agency online, selling in 24 hours. Websites, XML feeds, property manager and lead workflows for modern real estate teams.</p>
          </div>
          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-xs font-black uppercase tracking-[.24em] text-white/42">{column.title}</h3>
              <ul className="mt-5 space-y-3">
                {column.links.map(([label, href]) => <li key={label}><Link href={href} className="text-sm text-white/68 transition hover:text-white">{label}</Link></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-7 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Data Home. All rights reserved.</p>
          <p>Built for premium real estate agencies.</p>
        </div>
      </div>
    </footer>
  )
}
