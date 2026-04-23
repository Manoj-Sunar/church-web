import { ContactForm, Event, Leader, Member, Ministry, Sermon } from "./DataTypes";


export type UploadResponse = {
    url: string;
    publicId: string;
};



// ============= reusabe types
type User = {
    id: string;
    name: string;
    email: string;
    role: string;
}



export type Pagination = {
    total: number;
    page: number;
    limit: number;
    hasMore:boolean;
}



//  =========== Auth Api Response =====================
export interface IAuthResponse {
    message: string;
    user: User;
}



//=========== sermon api Response 



export interface Isermons {
    success: boolean;
    message: string;
    data: Sermon[]
    pagination: Pagination;
}

export interface IsermonDetails {
    success: boolean;
    message: string;
    data: Sermon;
}


//==============  Ministry Api response===============
export interface IMinistry {
    success: boolean;
    message: string;
    data: Ministry[];
    pagination: Pagination;
}

export interface IMinistryDetails {
    success: boolean;
    message: string;
    data: Ministry;
}

// ================== events api response =================
export interface IEvents {
    success: boolean;
    message: string;
    data: Event[];
    pagination: Pagination;
}

export interface IEventDetails {
    success: boolean;
    message: string;
    data: Event;
}


// ========= messages api response ========================
export interface IMessages {
    success: boolean;
    message: string;
    data: ContactForm[];
    pagination: Pagination;
}




// ============ leaders api response ======================
export interface ILeaders {
    success: boolean;
    message: string;
    data: Leader[];
    pagination: Pagination;
}




// ========== members api response ==================
export interface IMembers {
    success: boolean;
    message: string;
    data: Member[];
    pagination: Pagination;
}


// =============== analytics response =================
export interface IAnalytics {
    success: boolean,
    message: string,

    data: {
        cards: {
            totalMembers: number,
            membersGrowthPercent: string,
            totalSermons: number,
            sermonsGrowthPercent: string,
            activeMinistries: number,
            newMinistriesQuarter: number,
            avgAttendanceGrowth: string
        },
        charts: {
            memberGrowthLine: [],
            sermonsBarChart: [],
            ministryPieChart: []
        }
    }
}


export type PublicAnalytics = {
  totalMembers: number;
  totalSermons: number;
  totalMinistries: number;
};