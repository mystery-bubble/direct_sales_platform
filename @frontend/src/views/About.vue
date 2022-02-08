<template>
  <onworking text="這個頁面尚在開發中！" />
</template>

<script>
import Onworking from '@/components/common/simple/onworking.vue'

export default {
  components: {
    Onworking
  },
  methods: {
    goto( route ) {
      if ( this.$route.path === route ) {
        return
      }
      else {
        this.$router.push( route )
      }
    },
  },
  beforeMount() {
    let goto_confirm = confirm("這個頁面還在製作中！點擊確定來回到上一頁！")
    if ( goto_confirm ) {
      this.$router.back()
    }
    else {
      return;
    }
  }
}
</script>

<style>

</style>