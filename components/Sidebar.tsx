'use client';
import { listOfMenu } from '@/app/types/types';
import Link from 'next/link';

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
    return (
        <aside className="sidebar">
            {/* <button className="sidebar-btn">&gt; ALL_LINKS</button>
            <button className="sidebar-btn">&gt; ANALYTICS</button>
            <button className="sidebar-btn">&gt; ARCHIVE</button>
            <button className="sidebar-btn">&gt; SETTINGS</button> */}
            {sideBar.map((item, index) => (
                <Link style={{ color: 'black', fontWeight: 700 }} href={item.endpoint} key={index}>{item.title}</Link>
                // <button className="sidebar-btn" key={index}>{item.title}</button>
            ))}
            {/* <div style={{ marginTop: 'auto' }}>
                <button style={{ width: '100%' }}>+ NEW LINK</button>
            </div> */}
        </aside>
    );
};

export default Sidebar;
