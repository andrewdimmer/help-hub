import { UserPublicProfile } from "../Users/userTypes";

export declare interface EventGroupData {
  eventGroupId: string;
  organizationId: string;
  eventName: string;
  eventDescription: string;
  eventContactInfo: string;
  categories: string[];
}

export declare interface EventData {
  eventGroupId: string;
  organizationId: string;
  eventName: string;
  eventDescription: string;
  eventContactInfo: string;
  eventId: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  volunteersNeeded: number;
  categories: string[];
}

export declare interface EventDataWithCount extends EventData {
  volunteerCount: number;
}

export declare interface EventDataWithVolunteers extends EventData {
  volunteers: UserPublicProfile[];
}

export declare interface CreateNewEventGroupFunctionInput {
  eventGroupId: string;
  organizationId: string;
  eventName: string;
  eventDescription: string;
  eventContactInfo: string;
  events: {
    eventId: string;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    volunteersNeeded: number;
  }[];
  categories: string[];
}
