"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
  children,
  ...props
}) {
  return (
  <NextThemesProvider {...props}>
    <div className="text-black dark:text-white dark:bg-slate-900 min-h-screen select-none transition-colors duration-2500">
      {children}
      </div>
      </NextThemesProvider>
      )
}
