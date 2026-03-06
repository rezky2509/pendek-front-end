import DashboardHeader from '@/components/dashboardHeader';
import Sidebar from '@/components/Sidebar';

const Page = () => {
    return (
        <>
            <DashboardHeader />
            <main className='dashboard-main'>
                <Sidebar />
                <section className='content'>
                    <div className='section-header'>
                        <h1 className='section-title'>All Links</h1>
                    </div>

                    <div className="table-container">
                        <table className="url-table">
                            <thead>
                                <tr>
                                    <th>Short Path</th>
                                    <th>Destination</th>
                                    <th>Clicks</th>
                                    <th>Status</th>
                                    <th>Created</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><span className="short-url">shrt.io/x92f</span></td>
                                    <td><span className="long-url">https://github.com/design-systems/tokens/main/dist...</span></td>
                                    <td>1,204</td>
                                    <td><span className="tag">Active</span></td>
                                    <td>2m ago</td>
                                </tr>
                                <tr>
                                    <td><span className="short-url">shrt.io/promo</span></td>
                                    <td><span className="long-url">https://store.company.com/seasonal-campaign-2023-black-friday</span></td>
                                    <td>8,442</td>
                                    <td><span className="tag active">Active</span></td>
                                    <td>1h ago</td>
                                </tr>
                                <tr>
                                    <td><span className="short-url">shrt.io/beta-v2</span></td>
                                    <td><span className="long-url">https://staging.app.io/test-environment-alpha-user-7</span></td>
                                    <td>43</td>
                                    <td><span className="tag">Paused</span></td>
                                    <td>3h ago</td>
                                </tr>
                                <tr>
                                    <td><span className="short-url">shrt.io/k8s-log</span></td>
                                    <td><span className="long-url">https://monitoring.internal.net/dashboard/cluster-01/logs</span></td>
                                    <td>256</td>
                                    <td><span className="tag">Active</span></td>
                                    <td>5h ago</td>
                                </tr>
                                <tr>
                                    <td><span className="short-url">shrt.io/k8s-log</span></td>
                                    <td><span className="long-url">https://monitoring.internal.net/dashboard/cluster-01/logs</span></td>
                                    <td>256</td>
                                    <td><span className="tag">Active</span></td>
                                    <td>5h ago</td>
                                </tr>
                                <tr>
                                    <td><span className="short-url">shrt.io/k8s-log</span></td>
                                    <td><span className="long-url">https://monitoring.internal.net/dashboard/cluster-01/logs</span></td>
                                    <td>256</td>
                                    <td><span className="tag">Active</span></td>
                                    <td>5h ago</td>
                                </tr>
                                <tr>
                                    <td><span className="short-url">shrt.io/k8s-log</span></td>
                                    <td><span className="long-url">https://monitoring.internal.net/dashboard/cluster-01/logs</span></td>
                                    <td>256</td>
                                    <td><span className="tag">Active</span></td>
                                    <td>5h ago</td>
                                </tr>
                                <tr>
                                    <td><span className="short-url">shrt.io/k8s-log</span></td>
                                    <td><span className="long-url">https://monitoring.internal.net/dashboard/cluster-01/logs</span></td>
                                    <td>256</td>
                                    <td><span className="tag">Active</span></td>
                                    <td>5h ago</td>
                                </tr>
                                <tr>
                                    <td><span className="short-url">shrt.io/k8s-log</span></td>
                                    <td><span className="long-url">https://monitoring.internal.net/dashboard/cluster-01/logs</span></td>
                                    <td>256</td>
                                    <td><span className="tag">Active</span></td>
                                    <td>5h ago</td>
                                </tr>
                                <tr>
                                    <td><span className="short-url">shrt.io/k8s-log</span></td>
                                    <td><span className="long-url">https://monitoring.internal.net/dashboard/cluster-01/logs</span></td>
                                    <td>256</td>
                                    <td><span className="tag">Active</span></td>
                                    <td>5h ago</td>
                                </tr>
                                <tr>
                                    <td><span className="short-url">shrt.io/k8s-log</span></td>
                                    <td><span className="long-url">https://monitoring.internal.net/dashboard/cluster-01/logs</span></td>
                                    <td>256</td>
                                    <td><span className="tag">Active</span></td>
                                    <td>5h ago</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </main >
        </>
    );
}

export default Page;