<template>
    <div class="header">
        <div>
            <svg width="40" height="35" viewBox="0 0 40 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M34.7333 4.68332C33.8821 3.83166 32.8713 3.15607 31.7589 2.69513C30.6465 2.23419 29.4541 1.99695 28.25 1.99695C27.0458 1.99695 25.8535 2.23419 24.7411 2.69513C23.6286 3.15607 22.6179 3.83166 21.7667 4.68332L20 6.44999L18.2333 4.68332C16.5138 2.96384 14.1817 1.99784 11.75 1.99784C9.31827 1.99784 6.98615 2.96384 5.26666 4.68332C3.54717 6.40281 2.58118 8.73494 2.58118 11.1667C2.58118 13.5984 3.54717 15.9305 5.26666 17.65L7.03333 19.4167L20 32.3833L32.9667 19.4167L34.7333 17.65C35.585 16.7987 36.2606 15.788 36.7215 14.6756C37.1825 13.5632 37.4197 12.3708 37.4197 11.1667C37.4197 9.96251 37.1825 8.77016 36.7215 7.65773C36.2606 6.5453 35.585 5.53458 34.7333 4.68332V4.68332Z" stroke="#F0503A" stroke-width="3.33333" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
        <transition name="fade">
            <div class="text" v-if="isOpened">
                Lerimpresa
            </div>
        </transition>
        <div class="divider"></div>
        <transition name="fade">
            <div class="text" v-if="isOpened">
                Menu
            </div>
        </transition>
        <a class="button" @click="isOpened = !isOpened">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 20H35" stroke="#F0503A" stroke-width="3.33333" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M5 10H35" stroke="#F0503A" stroke-width="3.33333" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M5 30H35" stroke="#F0503A" stroke-width="3.33333" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </a>
    </div>
</template>

<style lang="sass">
    .header
        display: flex
        width: 100%
        gap: 16px
        align-items: center

        .text
            font-family: 'Montserrat'
            font-style: normal
            font-weight: 300
            font-size: 23.3333px
            line-height: 28px
            display: flex
            align-items: flex-end
            text-align: center
            color: #FF855E

        .divider
            flex-grow: 1
        
        .button
            cursor: pointer
            display: block
</style>

<script lang="ts" setup>
const isOpened = ref(false)
</script>