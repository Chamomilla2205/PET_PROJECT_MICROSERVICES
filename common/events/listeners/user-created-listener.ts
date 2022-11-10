import { Message } from "node-nats-streaming";
import { QueueGroup } from "../../queue-groups";
import { Listener } from "../base-listener";
import { Subjects } from "../subjects.enum";
import { UserCreatedEvent } from "../user-created-event";
export declare class UserCreatedListener extends Listener<UserCreatedEvent> {
    readonly subject = Subjects.UserCreated;
    queueGroupName: QueueGroup;
    onMessage(data: UserCreatedEvent['data'], msg: Message): void {
        const { id, email } = data;
        
        msg.ack();
    };
}
