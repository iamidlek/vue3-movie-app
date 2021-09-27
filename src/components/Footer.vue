<template>
  <footer>
    <Logo />
    <a 
      href="https://github.com/iamidlek"
      target="_blank">
      (c){{ new Date().getFullYear() }} Yanagi 
    </a>
  </footer>
</template>

<script>
import Logo from '~/components/Logo'

export default {
  components: {
    Logo
  }
}
</script>

<style lang="scss" scoped>
footer {
  padding: 70px 0;
  text-align: center;
  opacity: .3;
  .logo {
    // Logo의 RouterLink 는 a 태그로 변환됨
    display: block;
    margin-bottom: 4px;
  }
}
</style>
