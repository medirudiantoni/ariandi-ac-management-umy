import AppShell from "@/components/layout/appShell";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import { SWRConfig } from "swr";
import { fetcher } from "@/utils/fetcher";

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter()
  return (
    <SessionProvider session={session}>
      <SWRConfig value={{ fetcher, revalidateOnFocus: true }}>
        <AppShell>
          <AnimatePresence mode="wait" initial={false} onExitComplete={() => window.scrollTo(0, 0)}>
            <Component {...pageProps} key={router.asPath} />
          </AnimatePresence>
        </AppShell>
        <Toaster position="top-center" />
      </SWRConfig>
    </SessionProvider>
  );
}