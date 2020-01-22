import {ShortUserInfo} from "./user.model";
import {ShortOrganizationInfo} from "./organization.model";

export interface Ticket {
    id: number;
    board: NamedReference;
    summary: string;
    contactName: string;
    contactEmailAddress: string;
    company: NamedReference;
    status: NamedReference;
    severity: string;
    impact: string;
    priority?: TicketPriority;
    type?: NamedReference;
    dateEntered: Date;
    owner: MemberReference;
    _info: Info;
    customerUpdatedFlag?: boolean;
    details?: TicketDetails;
}

export interface TicketPriority {
    id: number,
    name: string
}

export interface TicketDetails {
    description: string;
    ccEmails: string[];
    comments: TicketComment[],
    attachments: TicketAttachment[],
    assignedMembers: MemberReference[],
    portalUser: ShortUserInfo;
    portalOrganization: ShortOrganizationInfo;
}

export interface TicketComment {
    text: string;
    author: string;
    dateCreated: Date;
    discussion: boolean;
    internal: boolean;
    resolution: boolean;
}

export interface TicketAttachment {
    id: number;
    fileName: string;
}

export interface NamedReference {
    id: number;
    name: string;
    identifier?: string;
}

export interface MemberReference {
    identifier: string;
    name: string;
}

export interface Member {
    identifier: string;
    firstName: string;
    lastName: string;
    officeEmail: string;
    portalUser: ShortUserInfo;
}

export interface Info {
    lastUpdated: Date;
}
export interface SeverityInfo {
    impact: string,
    urgency: string
}

export interface SeverityInfoObject {
    severityInfo: SeverityInfo,
    severityLevels: any
}