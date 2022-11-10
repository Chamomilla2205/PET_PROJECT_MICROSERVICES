import { Publisher } from "../base-publisher";
import { Subjects } from "../subjects.enum";
import { UserCreatedEvent } from "../user-created-event";
export declare class UserCreatedPublisher extends Publisher<UserCreatedEvent> {
    readonly subject = Subjects.UserCreated;
}
