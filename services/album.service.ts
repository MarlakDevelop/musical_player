import { AlbumModel } from "~~/models/album.model";
import { TrackModel } from "~~/models/track.model";
import { TrackService } from "~~/services/track.service";
import allAlbums from "~~/data/albums.json"

export class AlbumService {
    loadAlbums(genre_id?: number): AlbumModel[] {
        const tracks = new TrackService().loadTracks()
        // Не самый лучший алгоритм для фильтрация, это надежда на будущий бэк с SQL
        return allAlbums.filter((album: AlbumModel): boolean => {
            let flag = false
            if (tracks.filter((track: TrackModel): boolean => {
                return (
                    (track.albums.indexOf(album.id) !== -1) &&
                    (genre_id ? (track.genres.indexOf(genre_id) !== -1) : true)
                )
            }).length !== 0) {
                flag = true
            }
            return flag
        })
    }
}