<template>
  <div class="details">
    <div class="details_top">
      <div class="name">
        <p>{{ comment.name }}</p>
        <p>{{ formattedDate }}</p>
      </div>
      <div class="rating">
        <p>Rating</p>
        <div class="stars">
          <!-- Dynamically render stars based on comment value -->
          <img
            src="../assets/Star.svg"
            alt="star"
            v-for="i in comment.rating"
            :key="i"
          />
          <img
            src="../assets/white_star.svg"
            alt="star"
            v-for="i in 5 - comment.rating"
            :key="i"
          />
        </div>
      </div>
      <img
        v-if="comment.gender === 'male'"
        src="../assets/male.png"
        width="54"
        height="73"
        alt="profile"
      />
      <img
        v-else
        src="../assets/female.png"
        width="54"
        height="73"
        alt="profile"
      />
    </div>
    <p>{{ comment.text }}</p>
    <div class="btn">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        :fill="liked ? 'yellow' : '#eeebeb'"
        @click="toggleLike"
        class="thumb"
      >
        <path
          d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z"
        />
      </svg>

      <span>{{ likes }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
const props = defineProps({
  comment: {
    type: Object,
    required: true,
  },
});

const likes = ref(props.comment.likes);
const liked = ref(false);
console.log(likes.value);
const toggleLike = () => {
  liked.value = !liked.value;
  if (liked.value) {
    likes.value++;
  } else {
    likes.value--;
  }
  console.log(likes.value);
};
const formattedDate = computed(() => {
  const date = new Date(props.comment.date);
  const months = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "avgust",
    "september",
    "october",
    "november",
    "december",
  ];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
});
</script>

<style scoped>
.btn {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  align-items: center;
  padding: 10px 40px 0 0;
}
.thumb {
  height: 24px;
  width: 24px;
  cursor: pointer;
}
.details {
  background: #5bb9cd;
  width: 370px;
  font-size: 17px;
  border-radius: 10px;
  padding: 5px 5px 20px 5px;
  color: white;
}
button {
  background: #43ef27;
  padding: 5px 14px;
  font-size: 17px;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 14px;
}
button:hover {
  opacity: 0.9;
}
.details_top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
}
.details .rating {
  display: flex;
  flex-direction: column;
  margin: 9px;
  padding: 0 14px;
  justify-content: space-between;
}
.stars {
  display: flex;
  gap: 8px;
}
.name {
  background: #fffff526;
  border-radius: 10px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  gap: 19px;
}
</style>
