<template>
    <div class="inline-list">
        <a
            key="all"
            @click="() => onSelect(null)"
            :class="(null === props.activeAlbum) ? 'inline-item active' : 'inline-item'"
        >all</a>
        <a
            :key="`album-${album.id}`"
            v-for="album in props.albums"
            @click="() => onSelect(album.id)"
            :class="(album.id === props.activeAlbum) ? 'inline-item active' : 'inline-item'"
        >{{ album.name }}</a>
    </div>
</template>

<script lang="ts" setup>
import { GenreModel } from "~~/models/genre.model";

const props = defineProps<{
    albums: GenreModel[],
    activeAlbum: number | null
}>()
const emit = defineEmits(['onSelect'])
const onSelect = (album_id: number | null) => {
    if (album_id == props.activeAlbum) return
    emit('onSelect', album_id)
}
</script>

<style lang="sass">

</style>