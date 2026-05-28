export type listOfMenu = {
    title: string
    endpoint: string
}

export type userRegistration = {
    username: string,
    email: string,
    password: string
}

export type userLinkRegistration ={
    long_url: string,
    description: string,
    is_active: boolean
}


export type apiLoginResponse = {
    data: {
        email: string, 
        token: string, 
        username: string
    }
}

export type errorResponse = {
    errors:string
}

export type dashboardMetaData = {
    total_clicks: string,
    total_active_links: string, 
    most_clicks_link: string,
    recently_added_links: recentlyAddedLinksData
}

// Return as SINGLE Object
export type recentlyAddedLinkData = {
    id: string,
    short_url: string,
    long_url: string,
    total_clicks: number,
    is_active: boolean,
    description: string,
    created_at: string
}

// Type definition for an array of recentlyaddedlinkdata
export type recentlyAddedLinksData = recentlyAddedLinkData[]


// Loop Through Every Array of object
export function toRecentlyAddedLinks(linksDetails: recentlyAddedLinksData) {
    // The dashboard use this 
    return linksDetails.map((details) => ({
        id: details.id,
        shorten_url: details.short_url,
        original_url: details.long_url,
        total_click: details.total_clicks,
        url_status: details.is_active,
        description: details.description,
    }))
}

// Login type return 
// Establish a clean type contract to cross the Server -> Client bridge safely
// Discriminated Union (sometimes called a Tagged Union).
// In other word, you make a contract with next js that it only can return these three type. 
// Using the | (OR) operator means that it can only return one of three types given 
// Return as one type but we had pre-defined the type and compiled into one type 
// We pre-defined all the possiblility what can happen
// Using Generics for Payload HAndling 
export type API_RESPONSE<T> = 
  | { success: true; payload: T | T[]} 
  | { success: false; errorType: 'VALIDATION_ERROR'; data: errorResponse }
  | { success: false; errorType: 'SERVER_ERROR'; message: string }
