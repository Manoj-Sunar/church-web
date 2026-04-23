
// sermons types
export interface Sermon {
  _id?: string;
  slug: string;
  title: string;
  speaker: string;
  date: string;
  description: string;
  videoUrl?: string;
}


// Ministry types
export interface Ministry {
  _id?: string;
  slug: string;
  name: string;
  description: string;
  image: {
    url: string;
    publicId: string;
    alt: string;
  };
  leader: string;
  longDescription: string;
}

// Event types
export interface Event {
  _id?: string;
  slug: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: {
    url: string;
    publicId: string;
    alt: string;
  };
  category: string;
}

// Contact form types
export interface ContactForm {
  _id?: string;
  name: string;
  email: string;
  subject: string;
  messages: string;
}




export interface Leader {
  _id?: string;
  name: string;
  role: string;
  bio: string;
  image: {
    url: string;
    publicId: string;
    alt: string;
  };
  order_index?: number;
}


export interface Member {
  _id?:string;
  name: string;
  join_date: string;
  phone:string;
  image?: {
    url: string;
    publicId: string;
    alt: string;
  };
}


export interface Mission {
  id: number;
  slug: string;
  title: string;
  location: string;
  description: string;
  image: {
    url: string;
    publicId: string;
    alt: string;
  };
  longDescription: string;
  status: string;
}
