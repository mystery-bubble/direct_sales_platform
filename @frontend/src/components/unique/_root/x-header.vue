<template>
  <div class="header">
    <div class="main-part">
      <div class="logo-section">
        <img src="@/assets/title_logo.png" alt="西河堂御品顏LOGO_圖片" class="logo-img">
        <img src="@/assets/title_text.png" alt="西河堂御品顏LOGO_文字" class="text-img">
      </div>
      <div class="action-section">
        <div class="btn-group">
          <v-icon size="32">mdi-cart</v-icon>
        </div>
        <div class="guide-bar">
          <div class="active-container"></div>
          <div :class="{ 'active': item.isActive }" class="bar-item" v-for="( item, index ) in guideBarItems" :key="`item-${ index }`">{{ item.title }}</div>
        </div>
      </div>
    </div>
    <div class="sub-part">
      <a>test</a>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    guideBarItems: [
      {
        title: "商品總覽",
        route: "/",
        isActive: true
      },
      {
        title: "促銷活動",
        route: "/",
        isActive: false
      },
      {
        title: "關於我們",
        route: "/",
        isActive: false
      },
      {
        title: "幫助中心",
        route: "/",
        isActive: false
      }
    ]
  })
}
</script>

<style lang="postcss">
.header {
  @apply px-7 py-6 flex-col;
}

.main-part > .logo-section {
  @apply flex justify-end px-7 py-5 m-1;

  height: 170px;
  width: 465px;
  background-color: rgba(174, 155, 113, .3);
  border-radius: 24px;
}

.main-part > .action-section {
  @apply flex flex-col flex-grow justify-between items-end;
}

.main-part {
  @apply flex;
}

.sub-part {
  @apply flex items-center mt-2 mx-1 py-2 px-4 h-11;

  background-color: rgba(174, 155, 113, .3);
  border-radius: 8px;
}

.logo-img {
  object-fit: none;
}

.text-img {
  @apply pl-5;

  object-fit: none;
}

.btn-group {
  @apply flex
}

.guide-bar {
  @apply flex;

  position: relative;
}

.guide-bar > .active-container {
  position: absolute;
  width: 104px;
  height: 40px;
  left: 20px;
  background-color: #786F5C;
  border-radius: 8px;
}

.guide-bar > .bar-item {
  @apply mb-1 ml-5 px-5 py-2;

  font-weight: bold;
  color: rgba(66, 60, 49, 1);
  z-index: 1;
  cursor: pointer;
}

.active {
  color: rgba(243, 244, 245, 1) !important;
}
</style>