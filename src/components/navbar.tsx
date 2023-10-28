'use client';
import React from 'react';
import { ModeToggle } from './theme-toggle';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';

export function Navbar() {
    const { resolvedTheme } = useTheme();
    const LogoSource = resolvedTheme === 'dark' ? '/dark/logo.png' : '/light/logo.png';
    return (
        <nav className='sticky top-0 z-40 w-full select-none border-b bg-background/80 saturate-200 backdrop-blur-sm'>
            <div className='pl-10 pr-10 flex items-center justify-between py-3'>
                <Link href='/'>
                    <Image className='select-none' src={LogoSource} alt='logo' width={567 / 3.5} height={213 / 3.5} priority draggable={false} />
                </Link>
                <ModeToggle />
            </div>
        </nav>
    )
}