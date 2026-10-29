import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'

const SiteHeader = () => {
    const pathname = usePathname();
    const isSignedIn = false; // Replace with your actual authentication logic
    const isLandingPage = pathname === "/";
    return (
        <header className="fixed inset-x-0 top-0 z-20 flex h-18 items-center justify-between border-b border-white/6 bg-background/70 px-6 backdrop-blur-md md:px-10">
            <Link href={isSignedIn && !isLandingPage ? "/dashboard" : "/"} className="flex items-center">
                <Image src="/brand/logo-navbar-dark.png" alt="Outpost" width={314} height={160} className="h-9 w-auto" priority />
            </Link>
            {isLandingPage && (
                <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
                    <Link href="#product" className="transition-colors hover:text-foreground">Product</Link>
                    <Link href="#how-it-works" className="transition-colors hover:text-foreground">How it works</Link>
                    <Link href="#pricing" className="transition-colors hover:text-foreground">Pricing</Link>
                </nav>
            )}
            <div className="flex items-center gap-3">
                {isSignedIn ? (
                    <Link href="/dashboard" className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
                        Dashboard
                    </Link>
                ) : (
                    <Link href="/login" className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
                        Sign in
                    </Link>
                )}
            </div>
        </header>
    )
}

export default SiteHeader
