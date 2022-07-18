import { Publisher, Subject, UserCreatedEvent } from "@zhytomyr_war_elefant/common";

export class UserCreatedPublisher extends Publisher<UserCreatedEvent> {
    readonly subject: Subject.UserCreated = Subject.UserCreated;
}