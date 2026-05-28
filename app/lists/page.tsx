"use client"

import DashboardHeader from '@/components/dashboardHeader';
import Sidebar from '@/components/Sidebar';
import { useEffect, useState } from 'react';
import { getURLlist } from '../services/api';
import { API_RESPONSE, recentlyAddedLinkData, recentlyAddedLinksData} from '../types/types';
import Link from 'next/link';
import { useTimeAgo } from 'next-timeago';

// Modal Component
import ModalFormURL from '@/components/ModalFormURL';

const Page = () => {    

    // useTimeAgo hooks
    const {TimeAgo} = useTimeAgo()

    // Modal Opening tracking 
    const [isModalOpen,setIsModalOpen] = useState<boolean>(false)

    const [getListsURL,setGetListsURL] = useState<API_RESPONSE<recentlyAddedLinksData>| null>(null)

    const getURLList = async() => {
        const result = await getURLlist()
        if(result.success === true){
            console.info('API Fetch Success')
            setGetListsURL(result)
        } else if(result.success === false){
            alert('Bad Request')
        }else{
            // Later add toast
            alert('No data')
        }  
    }
    // Flowbite Installation error
    // https://github.com/themesberg/flowbite-react/issues/1620

    useEffect(()=>{
        getURLList()
    },[])
    return (
        <>
            <DashboardHeader />
            <main className='dashboard-main'>
                <Sidebar />
                <section className='content'>
                    <div className='section-header'>
                        <h1 className='section-title'>All Links</h1>
                    </div>
                    <div className='grid grid-cols-1'>
                        <div className="flex flex-item justify-end">
                            <button onClick={()=>setIsModalOpen(true)} className='bg-white text-2xl p-2'>Add new url</button>
                        </div>
                    </div>
                    {/* Modal Component Go here */}
                    <ModalFormURL isOpen={isModalOpen} onClose={()=>setIsModalOpen(false)}/>
                    <div className="table-container">
                        <table className="url-table">
                            <thead>
                                <tr>
                                    <th>Short Path</th>
                                    <th>Destination</th>
                                    <th>Clicks</th>
                                    <th>Description</th>
                                    <th>Status</th>
                                    <th>Created</th>
                                </tr>
                            </thead>
                            <tbody>
                                {getListsURL?.payload.data.map((link: recentlyAddedLinkData)=>(
                                    <tr key={link._id}>
                                        <td className='font-bold'><Link target='_blank' href={link.short_url} >{link.short_url}</Link></td>
                                        <td>{link.long_url}</td>
                                        <td>{link.total_clicks}</td>
                                        <td>{link.description}</td>
                                        <td>
                                            <span className={`tag ${link.is_active ? 'active' : ''}`}>
                                                {link.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td><TimeAgo date={link.created_at} locale='my'/></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

            </main >
        </>
    );
}

export default Page;