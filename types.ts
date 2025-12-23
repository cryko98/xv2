
export interface Profile {
  id: string;
  username: string;
  full_name: string;
  avatar_url: string;
  updated_at?: string;
}

export interface Tweet {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
  profiles: Profile;
  likes_count: number;
  retweets_count: number;
}

export interface User {
  id: string;
  email?: string;
  user_metadata?: {
    full_name?: string;
    avatar_url?: string;
    user_name?: string;
  };
}
