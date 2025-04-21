// components/SearchBox.tsx
"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import React from "react"

interface SearchBoxProps {
  value: string
  onChange: (val: string) => void
  placeholder?: string
  className?: string
}

const SearchBox: React.FC<SearchBoxProps> = ({
  value,
  onChange,
  placeholder = "Cari...",
  className = "",
}) => {
  return (
    <div className={`relative w-full max-w-sm ${className}`}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="pl-10"
      />
    </div>
  )
}

export default SearchBox
