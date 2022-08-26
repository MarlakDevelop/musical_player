<template>
    <div class="player">
        <svg class="timeline" height="663px" width="664px">
            <circle
                ref="progressBar"
                fill="None"
                cy="332"
                cx="332"
                r="316"
                stroke="#ffffff"
                stroke-width="30"
                style="stroke-dasharray: 1991.77; stroke-dashoffset: 1991.77;"
            />
            <circle
                fill="None"
                cy="332"
                cx="332"
                r="316"
                stroke-width="30"
                style="stroke-dasharray: 1991.77; stroke-dashoffset: 1991.77;"
            />
        </svg>
        <img src="/images/circle.png"/>
        <audio
            :src="`/tracks/${data.meta?.link}`"
            ref="audio"
            @loadedmetadata="updateMusic"
            @timeupdate="updateMusic"
            hidden
        ></audio>
        <div class="meta">
            <div class="title">
                {{ data.meta?.name }}
            </div>
            <div :class="data.isPlaying ? 'time is-playing' : 'time'">
                {{ formatedTimeData }}
            </div>
            <div class="controllers">
                <a class="back">
                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 20.5L9 12.5L19 4.5V20.5Z" fill="#DC0400"/>
                        <path d="M5 19.5V5.5" stroke="#DC0400" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </a>
                <a class="pause" @click="pause" v-if="data.isPlaying">
                    <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="22.5" cy="22.5" r="21" fill="#FF4A37" stroke="#DC0400" stroke-width="3"/>
                        <path d="M20.75 14.7001H16.85V30.3001H20.75V14.7001Z" fill="#DC0400"/>
                        <path d="M28.55 14.7001H24.65V30.3001H28.55V14.7001Z" fill="#DC0400"/>
                    </svg>
                </a>
                <a class="play" @click="play" v-else>
                    <svg width="46" height="45" viewBox="0 0 46 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="23" cy="22.5" r="21" fill="#FF4A37" stroke="#DC0400" stroke-width="3"/>
                        <path d="M18.125 13.725L31.775 22.5L18.125 31.275V13.725Z" fill="#DC0400"/>
                    </svg>
                </a>
                <a class="next">
                    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.5 4.5L15.5 12.5L5.5 20.5V4.5Z" fill="#DC0400"/>
                        <path d="M19.5 5.5V19.5" stroke="#DC0400" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </a>
            </div>
        </div>
    </div>
</template>

<style lang="sass">
@import "~/assets/style/colors.sass"

.player
    height: 663px
    width: 664px
    position: relative

    img
        position: absolute
        top: 0
        left: 0
        right: 0
        bottom: 0
        z-index: 5
    
    .timeline
        position: absolute
        top: 0
        left: 0
        right: 0
        bottom: 0
        z-index: 10

        circle
            stroke: transparent

            &:first-child
                transform: rotate(-90deg) translate(-100%, 0)
                stroke: rgba(255, 255, 255, 0.2)

    .meta
        display: flex
        flex-direction: column
        align-items: center
        position: absolute
        z-index: 15
        top: 50%
        left: 50%
        transform: translate(-50%, -50%)

        .title
            font-family: 'Montserrat'
            font-style: normal
            font-weight: 300
            font-size: 20px
            line-height: 24px
            display: flex
            text-align: center
            color: $background
        
        .time
            padding-top: 24px
            padding-bottom: 20px
            transition: padding 0.5s
            color: $background
        
            &.is-playing
                padding-top: 8px
                padding-bottom: 36px

        .controllers
            display: flex
            gap: 16px
            align-items: center

            a
                display: block
                cursor: pointer
</style>

<script lang="ts" setup>
import { TrackModel } from "~~/models/track.model";
import { TrackService } from '~/services/track.service'

const props = defineProps<{
    activeTrack: number
}>()

const trackService = new TrackService()

const progressBar = ref(null)

const audio = ref(null)
const data = reactive({
    list: trackService.loadTracks(),
    meta: trackService.loadTracks().filter((track: TrackModel): boolean => {
        return track.id === props.activeTrack
    })[0],
    isPlaying: false,
    currentTime: 0,
    duration: 0
})
const recalculateInfo = () => {
    if (data.audio) {
        data.audio.pause()
    }
    data.meta = data.list.filter((track: TrackModel): boolean => {
        return track.id === props.activeTrack
    })[0]
    data.currentTime = 0
    data.isPlaying = false
    console.log(data.audio)
}

const updateMusic = () => {
    if (audio) {
        data.currentTime = audio.value.currentTime
        if(audio.value.duration) {
            data.duration = audio.value.duration
            console.log(data.duration)
        }
        console.log(progressBar)
        progressBar.value.style.strokeDashoffset = `${(2 * Math.PI * (332 - 15)) - ((2 * Math.PI * (332 - 15)) * (data.meta?.currentTime / data.meta?.duration))}`
        if (audio.value.paused) {
            pause()
        } else {
            play()
        }
    }
}

onMounted(() => {
    recalculateInfo()
})

const formatedTimeData = computed(() => {
    let minutes = `${Math.floor(data.currentTime / 60)}`
    let seconds = `${Math.floor(data.currentTime % 60)}`
    if (minutes.length === 1) minutes = `0${minutes}`
    if (seconds.length === 1) seconds = `0${seconds}`
    return `${minutes}:${seconds}`
})

watch(() => props.activeTrack, () => {
    recalculateInfo()
    setTimeout(() => play(), 300)
})

watch(() => data.audio, () => {
    console.log(data.audio?.currentTime)
})

const play = () => {
    audio.value.play()
    data.isPlaying = true
}

const pause = () => {
    audio.value.pause()
    data.isPlaying = false
}
</script>