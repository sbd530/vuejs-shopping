<template>
  <div class="hidden">
    <vs-navbar shadow square center-collapsed v-model="active">
      <template #left>
        <vs-button @click="activeSidebar = !activeSidebar" flat icon>
          <i class="bx bx-menu"></i>
        </vs-button>
      </template>
      <vs-navbar-item to="/dashboard/home" :active="active == 'Home'" id="Home">
        Home
      </vs-navbar-item>

      <vs-navbar-group>
        <div>Order</div>
        <template #items>
          <vs-navbar-item
            to="/dashboard/orders"
            :active="active == 'All'"
            id="All"
          >
            All
          </vs-navbar-item>
          <vs-navbar-item
            to="/dashboard/orders/paysuccess"
            :active="active == 'Payment-Completed'"
            id="Payment-Completed"
          >
            Payment-Completed
          </vs-navbar-item>
          <vs-navbar-item
            to="/dashboard/orders/deliveryReady"
            :active="active == ' Preparing-Delivery'"
            id=" Preparing-Delivery"
          >
            Preparing-Delivery
          </vs-navbar-item>
          <vs-navbar-item
            to="/dashboard/orders/deliveryDone"
            :active="active == ' Delivery-Completedy'"
            id=" Delivery-Completed"
          >
            Delivery-Completed
          </vs-navbar-item>
          <vs-navbar-item
            to="/dashboard/orders/canceled"
            :active="active == 'Cancellation'"
            id="Cancellation"
          >
            Cancellation
          </vs-navbar-item>
        </template>
      </vs-navbar-group>
      <vs-navbar-group>
        Product
        <template #items>
          <vs-navbar-item
            to="/dashboard/products"
            :active="active == 'All-Products'"
            id="All-Products"
          >
            All
          </vs-navbar-item>
          <vs-navbar-item
            to="/dashboard/products/stock"
            :active="active == 'Inventory'"
            id="Inventory"
          >
            Inventory
          </vs-navbar-item>
        </template>
      </vs-navbar-group>
      <vs-navbar-item
        to="/dashboard/users"
        :active="active == 'User'"
        id="User"
      >
        User
      </vs-navbar-item>
      <vs-navbar-group>
        Q&A/Review
        <template #items>
          <vs-navbar-item
            to="/dashboard/question"
            :active="active == 'Q&A'"
            id="Q&A"
          >
            Q&A
          </vs-navbar-item>
          <vs-navbar-item
            to="/dashboard/review"
            :active="active == 'Review'"
            id="Review"
          >
            Review
          </vs-navbar-item>
        </template>
      </vs-navbar-group>
      <template #right>
        <login></login>
        <vs-button @click="goToSite()">Go to Site</vs-button>
      </template>
    </vs-navbar>

    <!-- 사이드 바 -->
    <vs-sidebar absolute v-model="active" :open.sync="activeSidebar">
      <template #logo> <i class="bx bx-cube-alt"></i> MYtree </template>
      <vs-sidebar-item id="home" to="/dashboard/home">
        <template #icon>
          <i class="bx bx-home"></i>
        </template>
        Home
      </vs-sidebar-item>
      <vs-sidebar-item id="market" >
        <template #icon>
          <i class="bx bx-grid-alt"></i>
        </template>
        <a @click="goToSite()">Go to Site</a>
      </vs-sidebar-item>
      
      <vs-sidebar-group>
        <template #header>
          <vs-sidebar-item arrow>
            <template #icon>
              <i class="bx bx-cart-alt"></i>
            </template>
            Order
          </vs-sidebar-item>
        </template>

        <vs-sidebar-item to="/dashboard/orders" id="ALL"> ALL </vs-sidebar-item>
        <vs-sidebar-item
          to="/dashboard/orders/paysuccess"
          id="Payment-Completed"
        >
          Payment-Completed
        </vs-sidebar-item>
        <vs-sidebar-item
          to="/dashboard/orders/deliveryReady"
          id="Preparing-Delivery"
        >
          Preparing-Delivery
        </vs-sidebar-item>
        <vs-sidebar-item
          to="/dashboard/orders/deliveryDone"
          id="Delivery-Completed"
        >
          Delivery-Completed
        </vs-sidebar-item>
        <vs-sidebar-item to="/dashboard/orders/canceled" id="Cancellation">
          Cancellation
        </vs-sidebar-item>
      </vs-sidebar-group>
      <vs-sidebar-group>
        <template #header>
          <vs-sidebar-item to="/dashboard/products" arrow>
            <template #icon>
              <i class="bx bxs-package"></i>
            </template>
            Product
          </vs-sidebar-item>
        </template>

        <vs-sidebar-item to="/dashboard/products/stock" id="Inventory">
          Inventory
        </vs-sidebar-item>
      </vs-sidebar-group>
      <vs-sidebar-item to="/dashboard/users" id="User">
        <template #icon>
          <i class="bx bx-user"></i>
        </template>
        User
      </vs-sidebar-item>
      <vs-sidebar-group>
        <template #header>
          <vs-sidebar-item arrow>
            <template #icon>
              <i class="bx bx-comment-error"></i>
            </template>
            Q&A/Reivew
          </vs-sidebar-item>
        </template>

        <vs-sidebar-item to="/dashboard/question" id="Q&A">
          Q&A
        </vs-sidebar-item>
        <vs-sidebar-item to="/dashboard/review" id="Reivew">
          Reivew
        </vs-sidebar-item>
      </vs-sidebar-group>
    </vs-sidebar>
  </div>
</template>
<script>
import Login from "./Login.vue";

export default {
  data() {
    return {
      active: "home",
      activeSidebar: false,
    };
  },
  components: {
    Login,
  },
  methods: {
    goToSite: function() {
      console.log('goToSite');
      window.location="http://localhost:8080/home";
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap");
* {
  font-family: "Poppins", sans-serif;
}
.logo {
  font-size: 25pt;
}
</style>
