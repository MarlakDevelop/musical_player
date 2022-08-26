<template>
  <div class="app">
    <c-header />
    <NuxtPage />
  </div>
</template>

<style lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap')

body
  font-family: Montserrat
  margin: 0

  .app
    height: 100vh
    width: 100vw
    overflow: hidden
    padding: 32px
    box-sizing: border-box
    display: flex
    flex-direction: column
    gap: 10px

.fade-enter-active, .fade-leave-active
  transition: opacity 0.5s ease

.fade-enter-from, .fade-leave-to
  opacity: 0
</style>