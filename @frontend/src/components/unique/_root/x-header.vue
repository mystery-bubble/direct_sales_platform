<template>
  <div class="header">
    <div class="logo-section">
      <img src="@/assets/title_logo.png" alt="西河堂御品顏LOGO_圖片" class="logo-img">
      <img src="@/assets/title_text.png" alt="西河堂御品顏LOGO_文字" class="text-img">
    </div>
    <div class="action-section">
      <div class="btn-group">
        <span class="iconify" data-icon="fa:home"></span>
      </div>
      <div>test</div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="postcss">
.header {
  @apply px-7 py-6 flex;
}

.header > .logo-section {
  @apply flex justify-end px-7 py-5 m-1;

  height: 170px;
  width: 465px;
  background-color: rgba(174, 155, 113, .3);
  border-radius: 24px;
}

.header > .action-section {
  @apply flex flex-col flex-grow items-end;
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
</style>