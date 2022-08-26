import { ObjectModel } from "./object.model";

export interface TrackModel extends ObjectModel {
    link: string,
    genres: number[],
    albums: number[]
}