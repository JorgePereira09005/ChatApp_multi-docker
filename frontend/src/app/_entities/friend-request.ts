import { User } from './user';

export class FriendRequest {
    id: number;
    acceptDate: Date;
    requester: User;
    requesterId: number;
    requested_to: User;
    requestedToId: number;
    accepted: boolean
}
