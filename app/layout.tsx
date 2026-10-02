import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {title:"Tejaswini Betina | Java Backend Engineer",description:"Java and Spring Boot backend engineering, event-driven services, observability, and cloud projects. Explore Tejaswini Betina’s work and experience.",icons:{icon:"/favicon.svg",shortcut:"/favicon.svg"}};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en" suppressHydrationWarning><body>{children}</body></html>}
