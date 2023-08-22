import {User} from "@prisma/client";


export type SafeUser = Omit<
    UserActivation,
    'createdAt' | 'updatedAt' | 'emailVerified'
> & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
    image?: string 
}