// public.api.ts
import { IEventDetails, IEvents, ILeaders, IMinistry, IMinistryDetails, IsermonDetails, Isermons, PublicAnalytics } from "../Types/APIResponse";
import { ContactForm, Leader } from "../Types/DataTypes";
import { apiClient } from "./apiClient";
import { PageContentResponse } from "@/app/Types/PageContent.types";

export const publicAPI = {


  // ================== public api for page content api which can perform all users =======================
  getPageContentByPageName: async (page: string) => {
    const res = await apiClient.get<PageContentResponse>(
      `/page-content/${page}`
    );
    return res
  },




  // ============== public api for sermons which can get or perform all users =====================

  getAllSermons: async (page: number, limit: number) => {
    const res = await apiClient.get<Isermons>(`/sermons?page=${page}&limit=${limit}`);
    return res
  },

  getSermonDetails: async (id: string) => {
    const res = await apiClient.get<IsermonDetails>(`/sermons/sermon-details/${id}`);
    return res;
  },



  // =================== public api for ministry which for all users include auth user and unauth user =============
  getAllMinistry: async (page?:number,limit?:number) => {
    const res = await apiClient.get<IMinistry>(`/ministry?page=${page}&limit=${limit}`);
    return res;
  },


  getMinistryById: async (id: string) => {
    const res = await apiClient.get<IMinistryDetails>(`/ministry/${id}`);
    return res;
  },



  // ==================== public api for events which for all users include auth user and unauthorized user ===============
  getAllEvents: async () => {
    const res = await apiClient.get<IEvents>(`/events`);
    return res;
  },

  getEventById: async (id: string, config?: any) => {
    const res = await apiClient.get<IEventDetails>(`/events/${id}`, config);
    return res;
  },


  // ======================== public api for contact any user and sent his own details with messages ================
  SendMessages: async (data: ContactForm) => {
    return apiClient.post("/contact", data);
  },




  // =========================== public api for geders get all leaders =====================
  getAllLeaders: async () => {
    return apiClient.get<ILeaders>("/leaders");
  },

  getLeaderById: async (id: string) => {
    return apiClient.get<Leader>(`/leaders/${id}`);
  },


  // =========== public analytics===============

  getPublicAnalytics: async () => {
    return apiClient.get<PublicAnalytics>("/admin/analytics/public")
  }



};