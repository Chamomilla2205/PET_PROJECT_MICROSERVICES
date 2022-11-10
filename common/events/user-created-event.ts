import { Subjects } from "./subjects.enum";
export interface UserCreatedEvent {
    subject: Subjects.UserCreated;
    data: {
        id: string;
        email: string;
    };
}
