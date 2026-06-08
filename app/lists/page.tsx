"use client"

import DashboardHeader from '@/components/dashboardHeader';
import Sidebar from '@/components/Sidebar';
import { useEffect, useState } from 'react';
import { getURLlist } from '../services/api';
import { API_RESPONSE, recentlyAddedLinkData, recentlyAddedLinksData, toRecentlyAddedLinks} from '../types/types';
import Link from 'next/link';
import { useTimeAgo } from 'next-timeago';
import { Pencil, Rss, Trash2 } from 'lucide-react';

// Modal Component
import ModalFormURL from '@/components/ModalFormURL';
import EditModal from '@/components/editModal';
import DeleteModal from '@/components/deleteModal';

const Page = () => {    

    // useTimeAgo hooks
    const {TimeAgo} = useTimeAgo()

    // Modal Opening tracking for Add New URL
    const [isModalOpenAddNewURL,setIsModalOpenAddNewURL] = useState<boolean>(false)

    const [isModalOpenEditURL,setIsModalOpenEditURL] = useState<boolean>(false)

    const [isModalDeleteURL,setIsModalOpenDeleteURL] = useState<boolean>(false)

    const [payloadDelete, setPayloadDelete] = useState<recentlyAddedLinkData | undefined>(undefined)

    const [getListsURL,setGetListsURL] = useState<recentlyAddedLinksData>([])

    // Selected Link
    const [selectedLink, setSelectedLink] = useState<recentlyAddedLinkData | undefined>(undefined)

    const getURLList = async() => {
        const result = await getURLlist() as API_RESPONSE<recentlyAddedLinksData>
        if(result.success === true){
            console.info('API Fetch Success')
            // console.info(result.payload)
            // Check if it return as an array or not 
            // Store it as an array to recentlyAddedLinksData else just store it as an empty array
            const listsURL = Array.isArray(result.payload) ? result.payload : [] as recentlyAddedLinksData[]
            setGetListsURL((listsURL) as recentlyAddedLinksData)

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
                            <button onClick={()=>setIsModalOpenAddNewURL(true)} className='bg-white text-2xl p-2'>Add new url</button>
                        </div>
                    </div>
                    {/* Modal Component Go here */}
                    <ModalFormURL isOpen={isModalOpenAddNewURL} 
                        onClose={()=>{
                            // When close, refresh the list
                            setIsModalOpenAddNewURL(false)
                            getURLList()
                        }
                    }/>
                    <div className="table-container">
                        <table className="url-table">
                            <thead>
                                <tr>
                                    <th>Action</th>
                                    <th>Short Path</th>
                                    <th>Destination</th>
                                    <th>Clicks</th>
                                    <th>Description</th>
                                    <th>Status</th>
                                    <th>Created</th>
                                </tr>
                            </thead>
                            <tbody>
                            {getListsURL.map((link: recentlyAddedLinkData)=>(
                                    <tr key={link._id}>
                                        <td className='flex flex-auto'>
                                            <Pencil
                                            onClick={()=>{
                                                console.log('Inserting to useState Selected Link')
                                                setIsModalOpenEditURL(true)
                                                setSelectedLink(link)
                                            }} 
                                             className='h-5 mr-5 mt-1 cursor-pointer'/>
                                            <Trash2 
                                            onClick={()=>{
                                                setIsModalOpenDeleteURL(true)
                                                setPayloadDelete(link)
                                            }} 
                                            className='cursor-pointer'/>
                                        </td>
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
                        {
                            selectedLink === undefined ? 
                            '' : 
                            <EditModal 
                            isOpen={isModalOpenEditURL} 
                            onClose={()=>{
                                setIsModalOpenEditURL(false)
                                // Reset the modal props
                                setSelectedLink(undefined)
                                // When close, refresh the list
                                getURLList()
                            }} 
                            urlDetail={selectedLink}/>  
                        }

                        {/* Guar Rendered */}
                        {isModalDeleteURL && payloadDelete ? (
                            <DeleteModal
                                isOpen={isModalDeleteURL}
                                onClose={() => {
                                    setIsModalOpenDeleteURL(false)
                                    setPayloadDelete(undefined)
                                    // When close, refresh the list
                                    getURLList()
                                }}
                                payload={payloadDelete}
                            />
                        ) : null}
                </section>

            </main >
        </>
    );
}

export default Page;