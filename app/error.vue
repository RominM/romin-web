<template>
    <div class='error'>
        <h1>404</h1>  
        <p>Oups, la page que vous cherchez n'existe pas</p>
        <call-to-action @click="backToHome" label="Accueil"/>
    </div>
</template>

<script setup lang='ts'>
const backToHome = () => {
    window.history.back()
}   
</script>

<style lang='scss' scoped>
  .error{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>