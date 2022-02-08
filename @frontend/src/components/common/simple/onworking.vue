<template>
  <div class="border-4 border-custom-black rounded-lg p-2">
    <div class="flex justify-center items-center py-16 bg-custom-black-trn-1 rounded-lg text-custom-white text-4xl font-bold">
      <div class="mr-5">
        <img src="@/assets/warning.png" height="60" width="60">
      </div>
      {{ text }}
      <div class="flex flex-row justify-center text-base py-1 px-3 ml-3 bg-custom-black-trn-1 rounded-lg home-btn" @click.stop="gotoHome">
        <span class="self-center mr-1.5">
          <Icon icon="mdi:home" class="activator-icon" />
        </span>
        <span>
          回首頁
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    }
  },
  methods: {
    gotoHome() {
      this.$router.push( "/" )
    }
  }
}
</script>

<style lang="postcss" scoped>
.home-btn:hover {
  @apply bg-custom-black cursor-pointer select-none
}
</style>