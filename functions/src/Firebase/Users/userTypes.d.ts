export declare interface UserPublicProfile {
  userId: string;
  displayName: string;
  email: string;
  phoneNumber: string;
  photoURL: string;
}

export declare interface UserProfile extends UserPublicProfile {
  zipcode: string;
  interests: string[];
  googleCalendarAuthorized: boolean;
}
