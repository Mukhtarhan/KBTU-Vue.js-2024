<template>
  <div class="body">
    <div class="content">
      <div class="content_head">
        <div class="content_left">
          <span class="date">{{ today }}</span>
          <span class="type">{{ selectedType || "Adventure" }}</span>
        </div>
        <div class="select">
          <select v-model="sortBy">
            <option value="rating">Rating</option>
            <option value="date">Date</option>
          </select>
        </div>
      </div>

      <!-- Display comments in a 3-column, 2-row grid -->
      <div class="comments-grid">
        <CommentDetails
          v-for="comment in paginatedComments"
          :key="comment.id"
          :comment="comment"
        />
      </div>

      <!-- Pagination controls -->
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">Prev</button>
        <span>{{ currentPage }} / {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">
          Next
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import CommentDetails from "../components/CommentDetails.vue";

// Receive the selectedType prop
const props = defineProps({
  selectedType: {
    type: String,
    default: "Adventure",
  },
});

// Get today's date in the desired format
const today = computed(() => {
  const date = new Date();
  return date.toLocaleDateString("en-GB"); // Adjust the locale as needed
});

const sortBy = ref("date");

// Mock comments data with date in ISO format for proper sorting
const comments = ref([
  {
    id: 1,
    gender: "male",
    name: "Mark Twen",
    date: "2024-09-13T12:00:00", // ISO format
    text: "This is an awesome adventure that I had! Thanks!",
    value: "Nature",
    rating: 4,
  },
  {
    id: 2,
    gender: "male",
    name: "Jane Doe",
    date: "2024-09-12T14:00:00", // ISO format
    text: "Great experience, love it!",
    value: "Adventure",
    rating: 4,
  },
  {
    id: 3,
    name: "John Smith",
    gender: "male",
    date: "2024-09-13T16:00:00", // ISO format
    text: "Not bad but could be better!",
    value: "Adventure",
    rating: 4,
  },
  {
    id: 4,
    gender: "female",
    name: "Alice",
    date: "2024-09-06T10:00:00", // ISO format
    text: "Fantastic trip!",
    value: "Adventure",
    rating: 4,
  },
  {
    id: 5,
    gender: "male",
    name: "Bob",
    date: "2024-09-11T09:00:00", // ISO format
    text: "Just okay.",
    value: "Adventure",
    rating: 2,
  },
  {
    id: 6,
    gender: "male",
    name: "Charlie",
    date: "2024-09-12T08:00:00", // ISO format
    text: "Amazing view!",
    value: "Adventure",
    rating: 3,
  },
  {
    id: 7,
    gender: "male",
    name: "Dan",
    date: "2024-08-12T15:00:00", // ISO format
    text: "It was fine.",
    value: "Adventure",
    rating: 3,
  },
  {
    id: 8,
    gender: "male",
    name: "Eve",
    date: "2024-09-08T13:00:00", // ISO format
    text: "So enjoyable!",
    value: "Adventure",
    rating: 3,
  },
  {
    id: 9,
    name: "Frank",
    gender: "male",
    date: "2024-09-05T14:00:00", // ISO format
    text: "Nice but not great.",
    value: "Fashion",
    rating: 2,
  },
  {
    id: 10,
    name: "Grace",
    gender: "female",
    date: "2024-09-02T11:00:00", // ISO format
    text: "Incredible trip!",
    value: "Modern",
    rating: 5,
  },
  {
    id: 11,
    name: "Alua",
    gender: "female",
    date: "2024-09-02T11:00:00", // ISO format
    text: "Incredible trip!",
    value: "Modern",
    rating: 5,
  },
  {
    id: 12,
    name: "Rose",
    gender: "female",
    date: "2024-09-02T11:00:00", // ISO format
    text: "Incredible trip!",
    value: "Nature",
    rating: 5,
  },
  {
    id: 13,
    name: "Grace",
    gender: "female",
    date: "2024-09-02T11:00:00", // ISO format
    text: "Incredible trip!",
    value: "Fashion",
    rating: 5,
  },

  {
    id: 14,
    name: "Aruzhan",
    gender: "female",
    date: "2024-09-02T11:00:00", // ISO format
    text: "Incredible trip!",
    value: "Fashion",
    rating: 5,
  },
  {
    id: 15,
    name: "Nazerke",
    gender: "female",
    date: "2024-09-02T11:00:00", // ISO format
    text: "Incredible trip!",
    value: "Modern",
    rating: 5,
  },
  {
    id: 16,
    name: "Alma",
    gender: "female",
    date: "2024-09-02T11:00:00", // ISO format
    text: "Incredible trip!",
    value: "Modern",
    rating: 5,
  },
  {
    id: 17,
    name: "Luna",
    gender: "female",
    date: "2024-09-02T11:00:00", // ISO format
    text: "Incredible trip!",
    value: "Modern",
    rating: 5,
  },

  {
    id: 18,
    name: "Marat",
    gender: "male",
    date: "2024-09-02T11:00:00", // ISO format
    text: "Incredible trip!",
    value: "Nature",
    rating: 5,
  },
  {
    id: 20,
    name: "Mukhtar",
    gender: "male",
    date: "2024-09-02T11:00:00", // ISO format
    text: "Incredible trip!",
    value: "Nature",
    rating: 5,
  },
  {
    id: 19,
    name: "Sultan",
    gender: "male",
    date: "2024-09-02T11:00:00", // ISO format
    text: "Incredible trip!",
    value: "Nature",
    rating: 5,
  },
  // Add more comments as needed
]);

const currentPage = ref(1);
const commentsPerPage = 6;

// Calculate total pages based on filtered comments
const totalPages = computed(() =>
  Math.ceil(filteredComments.value.length / commentsPerPage)
);

const sortedComments = computed(() => {
  return [...comments.value].sort((a, b) => {
    if (sortBy.value === "date") {
      return new Date(b.date) - new Date(a.date); // Sort by date, latest first
    } else if (sortBy.value === "rating") {
      return b.rating - a.rating; // Sort by rating, highest first
    }
    return 0;
  });
});

// Filter comments based on selected type
const filteredComments = computed(() => {
  return sortedComments.value.filter(
    (comment) => !props.selectedType || comment.value === props.selectedType
  );
});

// Get the paginated comments for the current page
const paginatedComments = computed(() => {
  const start = (currentPage.value - 1) * commentsPerPage;
  return filteredComments.value.slice(start, start + commentsPerPage);
});

// Pagination functions
const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};
</script>

<style scoped>
select {
  padding: 10px;
  position: absolute;
  top: 80px;
  right: 240px;
  border-radius: 5px;
  background: #eefcf7;
  border: none;
  color: green; /* Dark text color */
  font-size: 16px;
  height: fit-content;
  cursor: pointer;

  outline: none;
  transition: border-color 0.3s ease;
  width: 150px; /* Adjust width as needed */
}
.select {
  position: relative;
  width: 100%;
}

/* Dropdown arrow (custom appearance) */

/* Hover state */
select:hover {
  border-color: #43ef27; /* Change border color on hover */
}

/* Focus state */
select:focus {
  border-color: #43ef27; /* Focus border color */
  box-shadow: 0 0 5px rgba(67, 239, 39, 0.5); /* Green shadow effect */
}
.body {
  height: 100vh;
  width: 100%;
  position: relative;
}
.content_head {
  display: flex;

  padding: 0 60px;
  gap: 20px;
}
.content_left {
  display: flex;
  flex-direction: column;
}
.header {
  display: flex;
  justify-content: flex-end;
  padding: 20px;
}
.date {
  font-size: 28px;
  padding: 2px 10px;
  border-radius: 10px;
  width: fit-content;
  color: white;
  margin-top: 20px;
  background-color: #5bb9cd;
}
.type {
  font-size: 38px;
  font-weight: 700;
  margin-top: 20px;
  padding: 2px 10px;
  border-radius: 10px;
  width: fit-content;
  color: white;
  background-color: #5bb9cd;
}
.sort {
  cursor: pointer;
  background-color: #4caf50;
  color: white;
  padding: 10px;
  border-radius: 5px;
}

.content {
  position: absolute;
  top: 42px;
  bottom: 80px;
  right: 58px;
  left: 58px;
  background: linear-gradient(
    180deg,
    #fefefe 0%,
    #ced2d2 40%,
    #c1c5c5 62%,
    #b8bbbb 100%
  );
}

.comments-grid {
  margin: 30px 60px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

.pagination button {
  padding: 10px;
  margin: 0 10px;
  background-color: #43ef27;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 5px;
}
.pagination button:hover {
  opacity: 0.8;
}

.pagination span {
  margin: 0 10px;
}
</style>
