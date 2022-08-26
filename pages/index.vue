<template>
  <div class="player-container">
    <div class="player-box">
      <c-player
        :active-track="data.activeTrack"
      ></c-player>
    </div>
    <div class="lists">
      <div class="inline-lists">
        <div>
          <c-slider>
            <c-genres
              @onSelect="genreSelect"
              :genres="data.genres"
              :active-genre="data.activeGenre"
            />
          </c-slider>
        </div>
        <div class="line"></div>
        <div>
          <c-slider>
            <c-albums
              @onSelect="albumSelect"
              :albums="data.albums"
              :active-album="data.activeAlbum"
            ></c-albums>
          </c-slider>
        </div>
      </div>
      <div>
        <c-tracks
          @onSelect="trackSelect"
          :tracks="data.tracks"
          :active-track="data.activeTrack"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { AlbumModel } from "~~/models/album.model";
import { TrackModel } from "~~/models/track.model";
import { GenreModel } from "~~/models/genre.model";

import { GenreService } from '~/services/genre.service'
import { AlbumService } from '~/services/album.service'
import { TrackService } from '~/services/track.service'

const genreService = new GenreService()
const albumService = new AlbumService()
const trackService = new TrackService()

const data = reactive<{
  genres: GenreModel[],
  activeGenre?: number,
  albums: AlbumModel[],
  activeAlbum?: number,
  tracks: TrackModel[],
  activeTrack?: number,
}>({
  genres: [],
  activeGenre: null,
  
  albums: [],
  activeAlbum: null,

  tracks: [],
  activeTrack: 0
})

onBeforeMount(() => {
  data.genres = genreService.loadGenres()
  data.albums = albumService.loadAlbums()

  data.tracks = trackService.loadTracks()
  console.log('Привет мир')
  if (data.tracks.length !== 0) data.activeTrack = data.tracks[0].id
})

const genreSelect = (genre_id: number | null) => {
  if (genre_id === data.activeGenre) return
  
  data.activeGenre = genre_id
  data.activeAlbum = null

  data.albums = albumService.loadAlbums(data.activeGenre)
  data.tracks = trackService.loadTracks(data.activeGenre)
}
const albumSelect = (album_id: number | null) => {
  if (album_id === data.activeAlbum) return

  data.activeAlbum = album_id
  data.tracks = trackService.loadTracks(data.activeGenre, data.activeAlbum)
}
const trackSelect = (track_id) => {
  if (track_id === data.activeTrack) return

  data.activeTrack = track_id
}
</script>

<style lang="sass">
@import "~/assets/style/colors.sass"

.player-container
  padding: 0 70px
  flex-grow: 1
  display: flex
  align-items: center

  .player-box
    padding: 10px 0
    padding-left: 130px
    padding-right: 170px

  .lists
    flex-grow: 1
    display: flex
    flex-direction: column
    gap: 50px

    .inline-lists
      display: flex
      flex-direction: column
      gap: 23px

    .inline-list
      display: flex
      gap: 40px

      .inline-item
        color: $gray
        cursor: pointer
        transition: color 0.5s

        &.active
          color: $orange
          cursor: auto
    
    .line
      background-color: #E2E2E2
      height: 1px
      width: 100%
</style>