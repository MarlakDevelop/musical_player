import { GenreModel } from "~~/models/genre.model";
import allGenres from "~~/data/genres.json"

export class GenreService {
    loadGenres(): GenreModel[] {
        return allGenres
    }
}