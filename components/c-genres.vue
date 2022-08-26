<template>
    <div class="inline-list">
        <a
            @click="() => onSelect(null)"
            :class="(null === props.activeGenre) ? 'inline-item active' : 'inline-item'"
        >all tracks</a>
        <a
            v-for="genre in props.genres"
            @click="() => onSelect(genre.id)"
            :class="(genre.id === props.activeGenre) ? 'inline-item active' : 'inline-item'"
        >{{ genre.name }}</a>
    </div>
</template>

<script lang="ts" setup>
import { GenreModel } from "~~/models/genre.model";

const props = defineProps<{
    genres: GenreModel[],
    activeGenre: number | null
}>()
const emit = defineEmits(['onSelect'])
const onSelect = (genre_id: number | null) => {
    if (genre_id == props.activeGenre) return
    emit('onSelect', genre_id)
}
</script>

<style lang="sass">

</style>