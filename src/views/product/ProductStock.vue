<template>
  <div class="pom">
    <b-container class="bv-example-row">
      <b-row class="top">
        <b-col></b-col>
        <b-col></b-col>
        <b-col align="center"> </b-col>
      </b-row>
      <b-row class="box">
        <b-row>
          <b-col>Inventory</b-col>
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
                    products = $vs.sortData($event, products, 'productName')
                  "
                >
                  상품이름
                </vs-th>
                <vs-th
                  class="column"
                  sort
                  @click="products = $vs.sortData($event, products, 'rprice')"
                >
                  정가
                </vs-th>
                <vs-th
                  class="column"
                  sort
                  @click="products = $vs.sortData($event, products, 'stock')"
                >
                  수량
                </vs-th>
                <vs-th
                  class="column"
                  sort
                  @click="products = $vs.sortData($event, products, 'stock')"
                >
                  재고수정
                </vs-th>
                <vs-th
                  class="column"
                  sort
                  @click="
                    products = $vs.sortData($event, products, 'productInfo')
                  "
                >
                  저장
                </vs-th>
              </vs-tr>
            </template>
            <template #tbody>
              <vs-tr
                :key="i"
                v-model="products"
                v-for="(product, i) in $vs.getPage(
                  $vs.getSearch(products, search),
                  page,
                  max
                )"
                :data="product"
              >
                <vs-td>
                  {{ product.productName }}
                </vs-td>
                <vs-td>
                  {{ product.rprice.toLocaleString() }}원
                </vs-td>
                <vs-td>
                  {{ product.stock }}개
                </vs-td>
                <vs-td>
                  <b-form-spinbutton
                    id="sb-inline"
                    v-model="product.stock"
                    inline
                    min="1"
                    max="999"
                  ></b-form-spinbutton>
                </vs-td>

                <vs-td>
                  <vs-button
                    @click="updateStock(product.productId, product.stock)"
                    flat
                    :active="active == 0"
                  >
                    Save
                  </vs-button>
                </vs-td>
              </vs-tr>
            </template>
            <template #footer>
              <vs-pagination
                v-model="page"
                :length="$vs.getLength(products, max)"
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
      products: [],
      page: 1,
      max: 5,
      selected: [],
      search: ""
    };
  },
  mounted() {
    this.getProducts();
  },

  computed: {
    rows() {
      return this.products.length;
    },
  },
  methods: {
    getProducts: function () {
      http
        .get("/dashboard/products")
        .then((response) => {
          this.products = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateStock: function (productId, newStock) {
      http
        .patch("/dashboard/products/" + productId, newStock)
        .then((response) => {
          console.log(response.status);
          this.getProducts();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@500&display=swap");
* {
  font-family: "Noto Sans KR", sans-serif;
}
.Add-button {
  padding-top: 20px;
  width: 150px;
}
.save {
  position: relative;
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
  font-size: 15pt;
}
</style>
