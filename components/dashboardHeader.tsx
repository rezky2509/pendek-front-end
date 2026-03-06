'use client';
import Link from 'next/link';

export default function DashboardHeader() {
    return (
        <header className="dashboard-header">
            <div>Pendek</div>
            <div className="nav-group">
                {/* <Link href="#" className="nav-link">DOCS</Link> */}
                {/* <Link href="/dashboard" className="nav-link active">DASHBOARD</Link> */}
                {/* <Link href="/" className="nav-link">LOGOUT</Link> */}
            </div>
        </header>
    );
}
