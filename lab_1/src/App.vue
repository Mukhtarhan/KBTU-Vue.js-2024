<template>
  <div id="app">
    <header>
      <div class="logo">Mini Blog</div>
      <nav>
        <ul>
          <li>Home</li>
          <li>Politics</li>
          <li>Tech</li>
          <li>Entertainment</li>
          <li>Travel</li>
          <li>Sports</li>
        </ul>
        <div class="search-icon">🔍</div>
      </nav>
    </header>

    <section class="content-grid">
      <div
        v-for="(item, index) in gridItems"
        :key="index"
        :class="`grid-item item-${index + 1}`"
        :style="{ backgroundImage: `url(${item.image})` }"
      >
        <div class="tags">
          <span v-if="item.tags.length > 0" class="tag red-tag">{{
            item.tags[0]
          }}</span>
          <span v-if="item.tags.length > 1" class="tag blue-tag">{{
            item.tags[1]
          }}</span>
        </div>
        <h2 class="title">{{ item.title }}</h2>
        <p class="date">{{ item.date }}</p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      gridItems: [
        {
          image: "https://via.placeholder.com/300",
          tags: [],
          title: "Item 1",
          date: "2024-09-10",
        },
        {
          image: "https://via.placeholder.com/300",
          tags: ["News", "Breaking"],
          title: "Item 2",
          date: "2024-09-11",
        },
        {
          image: "https://via.placeholder.com/300",
          tags: [],
          title: "Item 3",
          date: "2024-09-12",
        },
        {
          image: "https://via.placeholder.com/300",
          tags: [],
          title: "Item 4",
          date: "2024-09-13",
        },
        {
          image: "https://via.placeholder.com/300",
          tags: [],
          title: "Item 5",
          date: "2024-09-14",
        },
      ],
    };
  },
};
</script>

<style>
/* Basic reset and styling */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #333;
  color: white;
}

.logo {
  font-size: 1.5rem;
}

nav ul {
  list-style: none;
  display: flex;
  gap: 1rem;
}

nav ul li {
  cursor: pointer;
}

.search-icon {
  margin-left: 1rem;
  cursor: pointer;
}
nav {
  display: flex;
}

/* Grid layout */
.content-grid {
  margin: 80px 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 1rem;
  padding: 2rem;
  grid-template-areas:
    "item1 item2 item3"
    "item4 item2 item5";
}

.grid-item {
  position: relative;
  background-size: cover;
  background-position: center;
  color: white;
  height: 200px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 10px;
}

.grid-item.item-1 {
  grid-area: item1;
}

.grid-item.item-2 {
  grid-area: item2;
  height: 410px; /* Since it's spanning two rows */
}

.grid-item.item-3 {
  grid-area: item3;
}

.grid-item.item-4 {
  grid-area: item4;
}

.grid-item.item-5 {
  grid-area: item5;
}

.tags {
  display: flex;
  gap: 0.5rem;
}

.tag {
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  border-radius: 4px;
}

.red-tag {
  background-color: red;
  color: white;
}

.blue-tag {
  background-color: blue;
  color: white;
}

.title {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.date {
  font-size: 0.85rem;
  opacity: 0.8;
}
</style>
