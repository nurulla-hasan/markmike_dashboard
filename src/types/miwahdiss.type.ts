export type MiwahdissStatus = "Draft" | "Active" | "Expired";

export interface IMiwahdissSection {
    id: string;
    title: string;
    description: string;
    catalogItems: string[]; // Product IDs
}

export interface IMiwahdissEvent {
    id: string;
    name: string;
    description: string;
    heroImage: string;
    eventDate: string;
    cutoffDate: string;
    deliveryTimeline: string;
    enableCheckout: boolean;
    pdfCatalog?: string;
    status: MiwahdissStatus;
    productCount: number;
    sections: IMiwahdissSection[];
}

export interface IModerationPost {
    id: string;
    userName: string;
    userAvatar: string;
    image: string;
    description: string;
    tag: string;
    status: "Pending" | "Approved" | "Rejected";
}
