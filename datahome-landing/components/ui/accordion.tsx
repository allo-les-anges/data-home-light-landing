"use client"

import * as React from "react"

interface AccordionItemProps {
  value: string
  question: string
  children: React.ReactNode
}

interface AccordionContextValue {
  openItem: string | null
  setOpenItem: (value: string | null) => void
}

const AccordionContext = React.createContext<AccordionContextValue>({
  openItem: null,
  setOpenItem: () => {},
})

function Accordion({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [openItem, setOpenItem] = React.useState<string | null>(null)
  return (
    <AccordionContext.Provider value={{ openItem, setOpenItem }}>
      <div className={`divide-y divide-[hsl(var(--border))] ${className}`}>{children}</div>
    </AccordionContext.Provider>
  )
}

function AccordionItem({ value, question, children }: AccordionItemProps) {
  const { openItem, setOpenItem } = React.useContext(AccordionContext)
  const isOpen = openItem === value

  return (
    <div className="py-4">
      <button
        className="flex w-full items-center justify-between text-left font-medium transition-colors hover:text-[#1d4ed8]"
        onClick={() => setOpenItem(isOpen ? null : value)}
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <svg
          className={`h-4 w-4 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100 mt-3" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-[hsl(var(--muted-foreground))] text-sm leading-relaxed">{children}</p>
      </div>
    </div>
  )
}

export { Accordion, AccordionItem }
