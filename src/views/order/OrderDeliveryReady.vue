<template>
  <div class="pom">
    <b-container class="bv-example-row">
      <b-row class="top"> </b-row>

      <b-row class="box">
        <b-row>
          <b-col>Preparing-Delivery</b-col>
          <b-col align="right">
            <b-form-select v-model="max" seleted="5" class="mb-3">
              <b-form-select-option :value="5"
                >Select an option</b-form-select-option
              >
              <b-form-select-option value="10">10 개</b-form-select-option>
              <b-form-select-option value="15">15 개</b-form-select-option>
              <b-form-select-option value="20">20 개</b-form-select-option>
              <b-form-select-option value="25">25 개</b-form-select-option>
            </b-form-select>
          </b-col>
        </b-row>
      </b-row>
      <b-row class="box">
        <b-col>
          <vs-table v-model="selected">
            <template #header>
              <vs-input
                v-model="search"
                border
                placeholder="Search"
                class="search-var"
              />
            </template>
            <template #thead>
              <vs-tr>
                <vs-th
                  class="column"
                  sort
                  @click="
                    orders = $vs.sortData($event, orders, 'shipmentCompany')
                  "
                >
                  배송업체
                </vs-th>
                <vs-th
                  class="column"
                  sort
                  @click="orders = $vs.sortData($event, orders, 'ordererName')"
                >
                  고객명
                </vs-th>
                <vs-th
                  class="column"
                  sort
                  @click="orders = $vs.sortData($event, orders, 'orderDate')"
                >
                  주문일자
                </vs-th>
                <vs-th
                  class="column"
                  sort
                  @click="orders = $vs.sortData($event, orders, 'created_at')"
                >
                  주문상태
                </vs-th>
                <vs-th
                  class="column"
                  sort
                  @click="
                    orders = $vs.sortData($event, users, 'deliveryStatus')
                  "
                >
                  배송상태
                </vs-th>
                <vs-th
                  class="column"
                  sort
                  @click="orders = $vs.sortData($event, orders, 'phone_number')"
                >
                  전화번호
                </vs-th>

                <vs-th
                  class="column"
                  sort
                  @click="
                    orders = $vs.sortData($event, orders, 'trackingNumber')
                  "
                >
                  송장번호
                </vs-th>
                <vs-th
                  class="column"
                  sort
                  @click="orders = $vs.sortData($event, orders, 'show_details')"
                >
                  저장
                </vs-th>
                <vs-th
                  class="column"
                  sort
                  @click="orders = $vs.sortData($event, orders, 'deleted')"
                >
                  주문 취소
                </vs-th>
              </vs-tr>
            </template>
            <template #tbody>
              <vs-tr
                :key="i"
                v-model="orders"
                v-for="(order, i) in $vs.getPage(
                  $vs.getSearch(orders, search),
                  page,
                  max
                )"
                :data="order"
                class="table"
              >
                <vs-td>
                  <vs-select
                    v-model="order.shipmentCompany"
                    class="trackingNumber"
                  >
                    <vs-option label="CJ대한통운" value="CJ대한통운">
                      CJ대한통운</vs-option
                    >
                    <vs-option label="로젠택배" value="로젠택배">
                      로젠택배
                    </vs-option>
                    <vs-option label="롯데택배" value="롯데택배">
                      롯데택배
                    </vs-option>
                    <vs-option label="한진택배" value="한진택배">
                      한진택배
                    </vs-option>
                    <vs-option label="쿠팡" value="쿠팡"> 쿠팡 </vs-option>
                    <vs-option label="CU 편의점택배" value="CU 편의점택배"
                      >CU 편의점택배</vs-option
                    >
                    <vs-option label="경동택배" value="경동택배">
                      경동택배
                    </vs-option>
                  </vs-select>
                </vs-td>
                <vs-td>
                  {{ order.ordererName }}
                </vs-td>
                <vs-td>
                  {{ order.orderDate }}
                </vs-td>
                <vs-td>
                  {{ order.orderStatus }}
                </vs-td>
                <vs-td>
                  {{ order.deliveryStatus }}
                </vs-td>
                <vs-td>
                  {{ order.phoneNumber1 }}-{{ order.phoneNumber2 }}-{{
                    order.phoneNumber3
                  }}
                </vs-td>

                <vs-td>
                  <vs-input v-model="order.trackingNumber" />
                </vs-td>
                <vs-td>
                  <vs-button
                    gradient
                    :active="active == 0"
                    @click="updateShipment(i)"
                  >
                    Save
                  </vs-button>
                </vs-td>
                <vs-td>
                  <vs-button
                    danger
                    :active="active == 0"
                    @click="cancelOrder(i)"
                  >
                    Delete
                  </vs-button>
                </vs-td>
              </vs-tr>
            </template>
            <template #footer>
              <vs-pagination
                v-model="page"
                :length="$vs.getLength(orders, max)"
              />
            </template> </vs-table
        ></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import http from "../../http-common";
export default {
  data() {
    return {
      search: "",
      page: 1,
      max: 5,
      orders: [],
      selected: [],
    };
  },
  computed: {
    rows() {
      return this.orders.length;
    },
  },

  mounted() {
    this.getOrders();
  },
  methods: {
    getOrders: function () {
      http
        .get("/dashboard/orders?deliveryStatus=READY")
        .then((response) => {
          this.orders = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateShipment: function (index) {
      if (this.orders[index].orderStatus == "주문취소") {
        alert("이미 취소된 주문입니다.");
        return;
      }
      http
        .post("/dashboard/orders/delivery", this.orders[index])
        .then((response) => {
          if (response.status == 200) {
            this.orders[index].deliveryStatus = "배송완료";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    cancelOrder: function (index) {
      http
        .put("/dashboard/orders/cancel", this.orders[index])
        .then(() => {
          this.orders[index].orderStatus = "주문취소";
          alert("주문이 취소되었습니다.");
          this.getOrders();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Jua&family=Noto+Sans+KR:wght@400;500&family=Poppins:wght@300&family=Roboto:wght@500&display=swap");
* {
  font-family: "Roboto", sans-serif;
}

.column {
  font-size: 12pt;
}
.mb-3 {
  width: 150px;
}
.pom {
  margin-top: 46px;
}
.pom .top {
  height: 50px;
}
.pom .box {
  margin: 10px 50px 0 50px;
  font-size: 23pt;
  color: #080842;
  height: 50px;
}
.table {
  font-size: 20pt;
}
</style>
