
import { IAnalytics, IMembers, IMessages, UploadResponse } from "../Types/APIResponse";
import { Event, Leader, Member, Ministry, Sermon } from "../Types/DataTypes";
import { apiClient } from "./apiClient";
import { PageKey, UpdatePageContentPayload } from "@/app/Types/PageContent.types";


export const adminAPI = {


    imageUpload: async (image: File): Promise<UploadResponse> => {
        const formData = new FormData();
        formData.append("file", image); // 👈 IMPORTANT

        return apiClient.post("/admin/uploads/image", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            timeout: 60000,
        });
    },



    // // ================= AUTH =================
    // register: async (body: {
    //     name: string;
    //     email: string;
    //     role: string;
    //     password: string;
    // }) => {
    //     return apiClient.post("/auth/register", body);
    // },




    login: (body: { email: string; password: string }) => {
        return apiClient.post("/auth/login", body);
    },






    // ================= PAGE CONTENT =================
    updatePageContent: async (
        pageName: PageKey,
        body: UpdatePageContentPayload
    ) => {
        return apiClient.patch(
            `/page-content/admin/${pageName}`,
            body
        );
    },


    // ======= sermon api only for admin ======================================
    // admin action
    createSermon: async (data: Sermon) =>
        apiClient.post("/sermons", data),



    updateSermon: async (id: string, data: Partial<Sermon>) =>
        apiClient.patch(`/sermons/sermon-update/${id}`, data),



    // Delete Sermons
    DeleteSermon: async (id: string) => {
        return apiClient.delete(`/sermons/${id}`);
    },




    //================================  Ministry api only for admin==============================

    //   ==== calling create ministry create api only for admin ==============
    createMinistry: async (data: Ministry) => {
        return apiClient.post("/ministry", data);
    },

    // ========= calling update ministry update api only for admin ===========
    updateMinistry: async (id: string, data: Partial<Ministry>) => {
        return apiClient.patch(`/ministry/${id}`, data);
    },


    // ========= calling remove ministry  api only for admin ===========
    ministryRemove: async (id: string) => {
        return apiClient.delete(`/ministry/${id}`);
    },


    // ================= Events api only for admin ===========================
    createEvents: async (data: Event) => {
        return apiClient.post("/events", data);
    },

    updateEvents: async (id: string, data: Partial<Event>) => {
        return apiClient.patch(`/events/${id}`, data);
    },


    deleteEvents: async (id: string) => {
        return apiClient.delete(`/events/${id}`);
    },


    // ================ contact messages api only admin can perform it =================================
    getAllMessages: async () => {
        return apiClient.get<IMessages>("/contact");
    },


    removeMessages: async (id: string) => {
        return apiClient.delete(`/contact/${id}`)
    },


    // ==================== leaders api only for admin, he could add new leader =======================
    addNewLeader: async (body: Leader) => {
        return apiClient.post("/leaders", body);
    },

    updateLeader: async (id: string, body: Partial<Leader>) => {
        return apiClient.patch(`/leaders/${id}`, body);
    },

    removeLeader: async (id: string) => {
        return apiClient.delete(`/leaders/${id}`);
    },

    // ===================== members api only for admin =======================

    addNewMember: async (body: Member) => {
        return apiClient.post("/members", body);
    },

    updateMember: async (id: string, body: Partial<Member>) => {
        return apiClient.patch(`/members/${id}`, body);
    },

    deleteMember: async (id: string) => {
        return apiClient.delete(`/members/${id}`);
    },

    getAllMembers: async () => {
        return apiClient.get<IMembers>("/members");
    },



    // ===================== analytics api ===============================
    Analytics: async () => {
        return apiClient.get<IAnalytics>("/admin/analytics");
    },



    // logout only admin can access this 
    Logout: async () => {
        return apiClient.post("/auth/logout", {});
    }

};