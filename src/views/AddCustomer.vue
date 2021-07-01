<template>
  <div class="submitform">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="userId">Name</label>
        <input
          type="text"
          class="form-control"
          id="userId"
          required
          v-model="reviews.userId"
          name="userId"
        />
      </div>

      <div class="form-group">
        <label for="rating">Age</label>
        <input
          type="number"
          class="form-control"
          id="rating"
          required
          v-model="reviews.rating"
          name="rating"
        />
      </div>

      <button v-on:click="saveCustomer" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" v-on:click="newCustomer">Add</button>
    </div>
  </div>
</template>

<script>
import http from "../http-common";

export default {
  name: "products",
  data() {
    return {
      reviews: {
        id: 0,
        productId: 0,
        userId: 0,
        content: "",
        rating: 0,
        active: false,
      },
      submitted: false,
    };
  },
  methods: {
    /* eslint-disable no-console */
    saveCustomer() {
      http
        .get("/reviews")
        .then((response) => {
          this.review.userId = response.data.userId;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });

      this.submitted = true;
    },
    newCustomer() {
      this.submitted = false;
      this.review = {};
    },
    /* eslint-enable no-console */
  },
};
</script>

<style>
.submitform {
  max-width: 300px;
  margin: auto;
}
</style>
