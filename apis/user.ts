export type UserDataForm = { hobby: string, address: string, phoneNumber: string }

export interface User {
    id: string;
    email?: string | null;
    displayName?: string | null;
    createdAt: { _seconds: number, _nanoseconds: number };
    lastUpdatedAt: { _seconds: number, _nanoseconds: number };
    hobby?: string;
    address?: string;
    phoneNumber?: string;
}

export type UserUpdateData = Partial<Omit<User, 'id' | 'email' | 'createdAt'>>;