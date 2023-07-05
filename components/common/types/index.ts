export type Payload = Record<string, unknown>;

export type UserAccount = {
    id: number;
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    code: string;
    profile_picture: string;
    state_id: number;
    local_government_id: number;
    ward_id: number;
    ip: string;
    email_verified_at: string;
    phone_verified_at: string;
    created_at: Date;
    updated_at: Date;
    primary_agent: {
        code: string;
        created_at: string;
        email: string;
        email_verified_at: string;
        first_name: string;
        id: number;
        ip: string;
        last_name: string;
        phone: string;
        phone_verified_at: string;
        profile_picture: string;
        updated_at: string;
        user_type_id: string;
    };
    user: {
        first_name: string;
        last_name: string;
        phone: string;
        wallet: {
            balance: string;
            created_at: Date;
            decimal_places: number;
            description: string;
            holder_id: string;
            holder_type: string;
            id: number;
            meta: string;
            name: string;
            slug: string;
            updated_at: Date;
            uuid: string;
        };
    };
};

export type States = {
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
};

export type LocalGovernment = {
    id: string;
    state_id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
};

export type Ward = {
    id: number;
    name: string;
    local_government_id: string;
    created_at: Date;
    updated_at: Date;
};
