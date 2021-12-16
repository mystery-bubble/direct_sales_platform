<template>
  <div
    class="custom-checkbox-container"
    :class="{ 'dark': this.dark }"
  >
    <div
      class="main"
      :style="`height: ${ realSize }px; width: ${ realSize }px`"
      @click="clickHandler"
    >
      <svg
        v-show="checked"
        xmlns="http://www.w3.org/2000/svg"
        :width="realSize - 7"
        :height="realSize - 7"
        viewBox="0 0 7.994 6.769"
      >
        <path 
          id="checkbox_path"
          data-name="checkbox_path"
          d="M2250.012,1841.332l3.465,6.009,3.668-6.009"
          transform="translate(-2249.579 -1841.071)"
          fill="none"
          :stroke="`${ this.dark ? '#F3F4F5' : '#707070' }`"
          stroke-linejoin="round"
          stroke-width="1.5"
        />
      </svg>
    </div>
    <div
      v-if="label"
      class="text"
    >
      {{ this.label }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dark: {
      type: Boolean,
      default: false
    },
    size: {
      type: [String, Number],
      default: "sm"
    },
    checked: {
      type: Boolean,
      default: false
    },
    label: {
      type: String
    }
  },
  computed: {
    realSize() {
      const choices = [ "xs", "sm", "md", "lg", "xl" ]
      if ( choices.includes( this.size ) ) {
        switch( this.size ) {
          case "xs":
            return 12;
          case "sm":
            return 18;
          case "md":
            return 24;
          case "lg":
            return 30;
          case "xl":
            return 36;
          default:
            throw TypeError( `${ this.size } is not a choice for size prop` )
        }
      }
      else if ( !( parseInt( this.size ) instanceof Number ) ) {
        throw TypeError( "The type of size prop should be Number or String." )
      }
      else {
        return this.size
      }
    }
  },
  methods: {
    clickHandler() {
      this.checked = !this.checked
    }
  }
}
</script>

<style lang="postcss">
@import "../../../styles/components/common/simple/custom-checkbox.pcss";
</style>