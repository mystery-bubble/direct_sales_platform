<template>
  <div
    class="custom-checkbox-container"
    :class="{ 'dark': this.dark }"
  >
    <div
      class="main"
      :style="`height: ${ realSize }px; width: ${ realSize }px`"
    >
      <input type="radio" :name="name" :checked="isChecked" class="w-full h-full border-0" @input="$emit( 'change', $event.target.checked )">
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
    isChecked: {
      type: Boolean,
      default: false
    },
    label: {
      type: String
    },
    name: {
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
  }
}
</script>

<style lang="postcss">
@import "../../../styles/components/common/simple/custom-checkbox.pcss";
</style>