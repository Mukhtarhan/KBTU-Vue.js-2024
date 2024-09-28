<template>
  <div class="details">
    <div class="details_top">
      <div class="name">
        <p>{{ comment.name }}</p>
        <p>{{ comment.date }}</p>
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
      <button>Like</button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  comment: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.btn {
  display: flex;
  justify-content: flex-end;
  padding: 10px 40px 0 0;
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
