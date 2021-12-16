<template>
  <div class="radio-switch-container" @click="clickHandler">
    <div
      class="text-left"
      v-if="this['text:left']"
      :style="`font-size: ${ realSize / 2 + 2 }px`"
    >
      {{ this['text:left'] }}
    </div>
    <span class="main">
      <div
        class="outer"
        :style="`width: ${ realSize * 2 }px; height: ${ realSize }px;`">
        <div
          :class="{ 'left': !this.state, 'right': this.state }"
          class="inner"
          :style="`width: ${ realSize - 3 }px; height: ${ realSize - 3 }px;`" 
        />
      </div>
    </span>
    <div
      class="text-right"
      v-if="this['text:right']"
      :style="`font-size: ${ realSize / 2 + 2 }px`"
    >
      {{ this['text:right'] }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    state: {
      type: Boolean,
      default: false
    },
    size: {
      type: [ String, Number ],
      default: "md"
    },
    "text:left": {
      type: String
    },
    "text:right": {
      type: String
    }
  },
  methods: {
    clickHandler(){
      this.stateChange()
    },
    stateChange() {
      this.state = !this.state
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

<style scoped lang="postcss">
@import "../../../styles/components/common/simple/radio-switch.pcss";
</style>