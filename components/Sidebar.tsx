'use client';
import { listOfMenu } from '@/app/types/types';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

// Sidebar menu content 
const sideBar: listOfMenu[] = [
    {
        title: 'Home',
        endpoint: '/dashboard',
    },
    {
        title: 'All Links',
        endpoint: '/lists',
    },
    {
        title: 'Insight',
        endpoint: '/statistics',
    },
    {
        title: 'Get-out',
        endpoint: '/api/users',
    },
]

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Check if mobile on mount
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 700);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Close sidebar when a link is clicked
    const handleLinkClick = () => {
        if (isMobile) {
            setIsOpen(false);
        }
    };

    // Close sidebar when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const sidebar = document.querySelector('.sidebar');
            const hamburgerBtn = document.querySelector('.hamburger-btn');
            
            if (isMobile && isOpen && sidebar && hamburgerBtn && 
                !sidebar.contains(e.target as Node) && 
                !hamburgerBtn.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isMobile && isOpen) {
            document.addEventListener('click', handleClickOutside);
            return () => document.removeEventListener('click', handleClickOutside);
        }
    }, [isMobile, isOpen]);

    return (
        <>
            {/* Hamburger Menu Button - Only visible on mobile */}
            <button
                className="hamburger-btn"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Overlay for mobile */}
            {isMobile && isOpen && (
                <div 
                    className="sidebar-overlay" 
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
                {/* <button className="sidebar-btn">&gt; ALL_LINKS</button>
                <button className="sidebar-btn">&gt; ANALYTICS</button>
                <button className="sidebar-btn">&gt; ARCHIVE</button>
                <button className="sidebar-btn">&gt; SETTINGS</button> */}
                {sideBar.map((item, index) => (
                    <Link 
                        style={{ color: 'black', fontWeight: 700 }} 
                        href={item.endpoint} 
                        key={index}
                        onClick={handleLinkClick}
                    >
                        {item.title}
                    </Link>
                ))}
                {/* <div style={{ marginTop: 'auto' }}>
                    <button style={{ width: '100%' }}>+ NEW LINK</button>
                </div> */}
            </aside>
        </>
    );
};

export default Sidebar;
