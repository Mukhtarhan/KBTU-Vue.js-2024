<template>
  <div class="container">
    <!-- Header with toggleMenu passed as prop -->
    <Header :toggleMenu="toggleMenu" />

    <!-- Sidebar transition and menu logic -->
    <transition name="sidebar">
      <aside v-if="menuVisible" class="sidebar">
        <p class="sidebar_menu" @click="toggleMenu">MENU</p>
        <div class="content">
          <div class="navigation">
            <!-- Emit the selected type when clicking -->
            <p
              v-for="menu in navigation"
              :key="menu.value"
              class="link"
              @click="filterComments(menu.value)"
            >
              {{ menu.name }}
            </p>
          </div>
          <div class="contact">
            <p class="head">CONTACTS</p>
            <div class="number">
              <p>PHONE: +1(234)-23-45-22</p>
              <p>ADDRESS: Green st., Yalow park</p>
              <p>EMAIL: Yallow@park.info</p>
            </div>
          </div>
        </div>
      </aside>
    </transition>

    <!-- Your main app content goes here -->
    <router-view :selectedType="selectedType" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import Header from "./components/Header.vue";

// State to control sidebar visibility
const menuVisible = ref(false);
const selectedType = ref(null);

const toggleMenu = () => {
  menuVisible.value = !menuVisible.value;
};

// Define navigation options
const navigation = [
  { name: "ADVENTURE BLOG", value: "Adventure" },
  { name: "NATURE BLOG", value: "Nature" },
  { name: "FASHION BLOG", value: "Fashion" },
  { name: "MODERN BLOG", value: "Modern" },
];

// Function to filter comments by type and pass it to child components
const filterComments = (type) => {
  selectedType.value = type;
  toggleMenu(); // Close sidebar after selection
};
</script>

<style scoped>
.container {
  background-color: yellowgreen;
}
/* Sidebar styling */
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 350px;
  background: #c1ebf1;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
  z-index: 1000;
  transition: transform 0.3s ease;
}

/* Sidebar slide-in animation */
.sidebar-enter-active,
.sidebar-leave-active {
  transition: transform 0.3s ease;
}

.sidebar-enter-from {
  transform: translateX(-100%);
}

.sidebar-leave-to {
  transform: translateX(-100%);
}

.sidebar_menu {
  width: 100%;
  border-radius: 20px;
  background: white;
  font-size: 28px;
  font-weight: 600;
  text-align: center;
  padding: 3px 0;
  cursor: pointer;
  color: #615c5c;
}

.content {
  height: 92%;
  background: white;
  margin: 20px 0;
  padding: 30px 0;
  border-radius: 10px;
}

.navigation {
  display: flex;
  flex-direction: column;
  gap: 21px;
}

.navigation .link {
  padding: 7px 37px;
  background: linear-gradient(90deg, #5dde6a 0%, #43d749 43.79%, #21cd1e 100%);
  cursor: pointer;
  font-size: 23px;
  font-weight: 500;
  color: white;
  text-align: left;
}

.contact {
  padding: 13px;
  margin: 74px 19px 0 19px;
  border-radius: 10px;
  color: white;
  background: linear-gradient(180deg, #aff090 0%, #45c330 100%);
}

.contact .head {
  font-family: Jersey 15;
  font-size: 23px;
  font-weight: 500;
  text-align: center;
}

.contact .number {
  margin-top: 41px;
  font-size: 17px;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  gap: 21px;
}
</style>
