import { ObjectId } from "mongodb";
import { Resume } from "./Resume";

export type User = {
    _id: ObjectId;
    email: string;

    resume: Resume | null;
}