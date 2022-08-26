import { TrackModel } from "~~/models/track.model";
import allTracks from "~~/data/tracks.json"

export class TrackService {
    loadTracks(genre_id?: number, album_id?: number): TrackModel[] {
        return allTracks.filter((track: TrackModel): boolean => {
            return (
                (album_id ? (track.albums.indexOf(album_id) !== -1) : true) &&
                (genre_id ? (track.genres.indexOf(genre_id) !== -1) : true)
            )
        })
    }
}