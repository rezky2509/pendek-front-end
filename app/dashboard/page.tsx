'use client'
import DashboardHeader from '@/components/dashboardHeader';
import FooterDashboard from '@/components/footerDasboard';
import Sidebar from '@/components/Sidebar'
import { useEffect, useState } from 'react';
import { dashboardData } from '../services/api';
import { dashboardMetaData, recentlyAddedLinkData, recentlyAddedLinksData } from '../types/types';

const date: Date = new Date();

const DashboardPage = () => {

    // LOGIC SEEMS WRONG
    // Need to refactor

    // For fast development, use normal react state management. 
    // Later we use react-import { connect } from 'react-redux'
    const [dashboardDetails,setDashboarDetails] = useState<dashboardMetaData>({
        total_clicks: "Loading",
        total_active_links: "Loading",
        most_clicks_link: 'Loading',
        recently_added_links:[]
    })

    // RE-WRITE THIS
    async function dashboardDataDetails() {
        const result = await dashboardData()
        if (!result || typeof result === 'boolean') {
            console.error('Failed to load dashboard data', result)
            alert('Unable to fetch data from server. Please try again')
            return
        }
        const payload = (result as any)?.data ?? result
        // console.log('API valid')
        // console.log('Full payload:', payload)
        // console.log('Recently added:', payload.recently_added_links)
        setDashboarDetails({
            total_clicks: payload.total_clicks || "0",
            total_active_links: payload.total_active_links || "0",
            most_clicks_link: payload.most_clicks_link || "N/A",
            // IF the recently added links is an array store as not array
            recently_added_links: Array.isArray(payload.recently_added_links) ? payload.recently_added_links : []
        })
    }

    

    useEffect(() => {
        dashboardDataDetails()
    }, [])

    return (
        <>
            <DashboardHeader />
            <main className="dashboard-main">
                <Sidebar />

                <section className="content" style={{ paddingTop: '0' }}>
                    <div className="section-header">
                        <h1 className="section-title">Dasboard</h1>
                        <div style={{ fontSize: '12px', fontWeight: 700 }}>{date.toDateString()}</div>
                    </div>

                    <div className="stats-grid">
                        <div className="stat-card">
                            <span className="stat-label">Total Active Clicks</span>
                            <div className="stat-value">{dashboardDetails?.total_clicks}</div>
                        </div>
                        <div className="stat-card">
                            <span className="stat-label">Active Links</span>
                            <div className="stat-value">{dashboardDetails?.total_active_links}</div>
                        </div>
                        <div className="stat-card">
                            <span className="stat-label">Top Performer</span>
                            <div className="stat-value">{dashboardDetails.most_clicks_link.trimStart()}</div>
                        </div>
                    </div>
                    <h2 style={{ textTransform: 'uppercase', fontSize: '14px', marginBottom: '16px' }}>[RECENTLY_ADDED]</h2>
                        <table className="url-table">
                            <thead>
                                <tr>
                                    <th>Short Path</th>
                                    <th>Destination</th>
                                    <th>Clicks</th>
                                    <th>Status</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dashboardDetails.recently_added_links?.map((link: recentlyAddedLinkData) => (
                                    <tr key={link.id}>
                                        <td><span className="short-url">{link.shorten_url}</span></td>
                                        <td><span className="long-url">{link.original_url}</span></td>
                                        <td>{link.total_clicks.toLocaleString()}</td>
                                        <td>
                                            <span className={`tag ${link.is_active ? 'active' : 'false'}`}>
                                                {link.is_active ? 'Active' : 'Paused'}
                                            </span>
                                        </td>
                                        <td>{link.description}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                </section>
            </main>
            <FooterDashboard />
        </>
    );
}

export default DashboardPage;