<template>
  <header>
    <img
      src="../assets/menu.png"
      alt="menu"
      width="51"
      class="menu"
      @click="toggleMenu"
    />
    <div class="welcome">
      <h2>New trips on Fall season! Full details on our Instagram accounts.</h2>
    </div>
    <span class="circle">
      <img src="../assets/profile.png" alt="profile" width="36" />
    </span>
  </header>
</template>

<script setup>
defineProps({
  toggleMenu: {
    type: Function,
    required: true,
  },
});
</script>

<style scoped>
header {
  background: #ffffffbd;
  margin-top: 6px;
  display: flex;
  padding: 7px 4px;
  justify-content: space-between;
}

.welcome {
  width: 100%;
  margin: 0 20px;
  align-items: center;
  display: flex;
  border-radius: 14px;
  justify-content: center;
  background: linear-gradient(
    90deg,
    #e5f67c 0%,
    #ecef64 33%,
    #d2e037 66%,
    #eaee3a 100%
  );
}

h2 {
  text-align: center;
  padding: 0 10px;
  font-family: Inknut Antiqua;
  font-size: 17px;
  font-weight: 400;
}

.menu {
  cursor: pointer;
}

.circle {
  width: 55px;
  height: 52px;
  border-radius: 50%;
  background: #7eefff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
</style>
