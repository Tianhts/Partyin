export interface UserProfile {
    user_id: string;
    name: string;
    role: string;
    university: string;
    major: string;
    semester: string;
    skills: string[];
    is_banned: boolean;
}