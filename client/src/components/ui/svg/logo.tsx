import React, { memo } from 'react';

type Props = {
    className?: string;
};

export const Logo = memo(({ className }: Props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="160" height="40" viewBox="0 0 160 40" className={className}>
            <defs>
                <clipPath id="circleMask">
                    <circle cx="20" cy="20" r="20" />
                </clipPath>
            </defs>
            <g fillRule="evenodd">
                {/* Logo Text */}
                <text x="50" y="15" fill="#1a73e8" alignment-baseline="auto" font-weight="900" 
                    font-family="Arial, sans-serif" letterSpacing="0em" text-anchor="start">ADGUARD</text>
                <text x="50" y="35" fill="#5f6368" alignment-baseline="auto" font-weight="700" 
                    font-family="Arial, sans-serif" letterSpacing="0em" text-anchor="start">Private</text>
                
                {/* Colorful Overlapping Circles */}
                <g clipPath="url(#circleMask)">
                    {/* Background Circle */}
                    <circle cx="20" cy="20" r="20" fill="#1a73e8" />
                    
                    {/* Overlapping Circles */}
                    <circle cx="10" cy="14" r="14" fill="#34a853" opacity="0.7" />
                    <circle cx="30" cy="14" r="12" fill="#fbbc04" opacity="0.7" />
                    <circle cx="28" cy="28" r="12" fill="#ea4335" opacity="0.7" />
                </g>
                
                {/* AP Text */}
                <text x="20" y="21" fill="#fff" alignment-baseline="middle" font-weight="900"
                    font-family="Arial, sans-serif" letterSpacing="0em" text-anchor="middle">AP</text>
            </g>
        </svg>
    );
});

Logo.displayName = 'Logo';
