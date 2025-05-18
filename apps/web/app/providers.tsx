"use client";

import { ThemeProvider } from "./components/theme-provider";
import { TanstackQueryProvider } from "./providers/query-client-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={true}
      disableTransitionOnChange={true}
    >
      <TanstackQueryProvider>{children}</TanstackQueryProvider>
    </ThemeProvider>
  );
}
