import { User } from './user';

export class Post {
    id: number;
    datePost: string;
    content: string;
    childrenPosts: Post[];
    postedBy: User;
    postedbyid: number;
    parentpostid: number;
}
