import { Footer } from "@/components/shared/footer";
import { Header } from "@/components/shared/header";
import { getLayoutData } from "@/data/general";
import { inter, alegrey } from "@/lib/font";
import { GoogleTagManager } from "@next/third-parties/google";
import type { Metadata } from "next";
import { VisualEditing } from "next-sanity";
import { draftMode } from "next/headers";
import "./globals.css";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { SanityLive } from "@/sanity/lib/live";
import { Fragment } from "react";
import { DisableDraftMode } from "@/components/misc/disable-preview-mode";

export const metadata: Metadata = {
  title: {
    template: `%s | ${SITE_NAME}`,
    default: SITE_NAME,
  },
  metadataBase: new URL(SITE_URL),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDraftMode = (await draftMode()).isEnabled;

  const { data } = await getLayoutData();

  return (
    <html lang="en" className="scroll-smooth">
      {data?.googleTagManagerId && (
        <GoogleTagManager gtmId={data.googleTagManagerId} />
      )}
      <body
        id="top"
        className={`${inter.variable} ${alegrey.variable} grid min-h-screen max-w-[100vw] grid-rows-[1fr_auto] overflow-x-clip bg-background antialiased [font-family:var(--font-sans)]`}
      >
        <Header {...(data?.header ?? undefined)} />
        <main>{children}</main>
        <Footer />
        {isDraftMode && (
          <Fragment>
            <VisualEditing />
            <DisableDraftMode />
          </Fragment>
        )}
        <SanityLive />
      </body>
    </html>
  );
}
