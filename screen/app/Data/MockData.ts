import { Event, Ministry, Sermon, Leader, Member, Mission } from "@/app/Types/DataTypes";
import type { ContentPayload } from "@/app/API/Client";

export const mockSermons: Sermon[] = [
  {
    id: "1",
    slug: "finding-light-in-darkness",
    title: "Finding Light in Darkness",
    speaker: "Pastor John Doe",
    date: "2024-03-01",
    series: "Hope for Today",
    tags: ["Hope", "Faith", "Light"],
    description:
      "A powerful message about finding hope even in the most difficult times.",
    thumbnail: "https://picsum.photos/seed/sermon1/800/450",
  },
  {
    id: "2",
    slug: "the-power-of-community",
    title: "The Power of Community",
    speaker: "Pastor Jane Smith",
    date: "2024-02-23",
    series: "Walking Together",
    tags: ["Community", "Love", "Unity"],
    description: "How we are stronger when we stand together in faith.",
    thumbnail: "https://picsum.photos/seed/sermon2/800/450",
  },
  {
    id: "3",
    slug: "grace-abounding",
    title: "Grace Abounding",
    speaker: "Pastor John Doe",
    date: "2024-02-16",
    series: "Hope for Today",
    tags: ["Grace", "Forgiveness"],
    description: "Exploring the infinite grace of God in our daily lives.",
    thumbnail: "https://picsum.photos/seed/sermon3/800/450",
  },
];

export const mockMinistries: Ministry[] = [
  {
    id: "1",
    slug: "kids-ministry",
    name: "Kids Kingdom",
    description: "A fun and safe place for children to learn about God.",
    image: "https://picsum.photos/seed/kids/800/600",
    leader: "Sarah Wilson",
    longDescription:
      "Our Kids Kingdom ministry is dedicated to nurturing the faith of our youngest members through interactive lessons, games, and music. We believe that every child is a gift and we strive to create an environment where they feel loved and valued.",
  },
  {
    id: "2",
    slug: "youth-ministry",
    name: "Emanuel Youth",
    description: "Empowering the next generation of leaders.",
    image: "https://picsum.photos/seed/youth/800/600",
    leader: "Mark Thompson",
    longDescription:
      "Emanuel Youth is a vibrant community of teenagers who are passionate about their faith and making a difference in the world. We meet weekly for worship, discussion, and social events.",
  },
  {
    id: "3",
    slug: "outreach",
    name: "Global Outreach",
    description: "Spreading light to the nations through service.",
    image: "https://picsum.photos/seed/outreach/800/600",
    leader: "David Chen",
    longDescription:
      "Our Global Outreach ministry focuses on serving both our local community and international partners. From food drives to mission trips, we aim to be the hands and feet of Jesus.",
  },
];

export const mockEvents: Event[] = [
  {
    id: "1",
    slug: "easter-celebration",
    title: "Easter Celebration",
    date: "2024-03-31",
    time: "10:00 AM",
    location: "Main Sanctuary",
    description:
      "Join us for a joyful celebration of the resurrection of Jesus.",
    image: "https://picsum.photos/seed/easter/800/600",
    category: "Special Service",
  },
  {
    id: "2",
    slug: "community-picnic",
    title: "Community Picnic",
    date: "2024-04-15",
    time: "12:30 PM",
    location: "Central Park",
    description: "A day of fun, food, and fellowship for the whole family.",
    image: "https://picsum.photos/seed/picnic/800/600",
    category: "Fellowship",
  },
];

// add empty/mock data for resources you already support in api
export const mockLeaders: Leader[] = [];
export const mockMembers: Member[] = [];
export const mockMissions: Mission[] = [];

export const mockContent: Record<string, ContentPayload> = {
  home: {
    hero_title: "Welcome to Our Church",
    hero_subtitle: "A place of faith, love, and community.",
    hero_image: "https://picsum.photos/seed/church-home/1200/700",
    main_text: "We are glad you are here.",
    contact_email: "church@example.com",
    contact_phone: "+977-9800000000",
    contact_address: "Kathmandu, Nepal",
    bank_info: "Mock Bank Account 123456789",
  },
};