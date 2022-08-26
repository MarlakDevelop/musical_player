<template>
    <div class="tracks-list">
        <div
            v-for="track in props.tracks"
            @click="() => onSelect(track.id)"
            class="track"
        >
            <a class="button" v-if="track.id !== props.activeTrack">
                <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="16" cy="16.75" r="16" fill="#FF4A37"/>
                    <path d="M12 9.55005L23.2 16.75L12 23.9501V9.55005Z" fill="#FF855E"/>
                </svg>
            </a>
            <a class="button active" v-else>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="16" cy="16" r="16" fill="#FF4A37"/>
                    <path d="M21 22.6667V14.3334" stroke="#FF855E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M16 22.6667V9.33337" stroke="#FF855E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M11 22.6666V17.6666" stroke="#FF855E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </a>
            <div class="text">
                {{ track.name }}
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { TrackModel } from "~~/models/track.model";

const props = defineProps<{
    tracks: TrackModel,
    activeTrack: number
}>()

const emit = defineEmits(['onSelect'])
const onSelect = (track_id: number | null) => {
    if (track_id == props.activeTrack) return
    emit('onSelect', track_id)
}
</script>

<style lang="sass">
@import "~/assets/style/colors.sass"

.tracks-list
    display: grid
    grid-template-columns: 1fr 1fr
    grid-auto-rows: 32px
    height: 240px
    overflow-y: auto
    overflow-x: hidden
    grid-gap: 20px
    align-items: start

    &::-webkit-scrollbar
        width: 4px
    
    &::-webkit-scrollbar-track
        background-color: $gray
        width: 4px
    
    &::-webkit-scrollbar-thumb
        background-color: $orange
        width: 4px

    .track
        display: flex
        gap: 12px
        align-items: center

        .button
            display: block
            cursor: pointer
            height: 32px
            width: 32px

            &.active
                cursor: auto

        .text
            font-style: normal
            font-weight: 300
            font-size: 15px
            line-height: 18px
            color: $black
</style>
