<template>
  <div class="pom">
    <b-container class="bv-example-row">
      <b-row class="top">
        <b-col></b-col>
        <b-col></b-col>
        <b-col align="center">
          <product-add class="Add-button"
            v-on:save="getProducts()"></product-add>
        </b-col>
      </b-row>
      <b-row class="box">
        <b-row>
          <b-col>Products-All</b-col>
          <b-col>
            <b-form-spinbutton
              id="sb-inline"
              min="1"
              v-model="max"
              inline
              :value="1"
            >
            </b-form-spinbutton
          ></b-col>
          <b-col></b-col>

          <b-col align="right" class="save"> </b-col>
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
                  @click="products = $vs.sortData($event, products, 'dprice')"
                >
                  할인가
                </vs-th>
                <vs-th
                  class="column"
                  sort
                  @click="products = $vs.sortData($event, products, 'stock')"
                >
                  재고
                </vs-th>
                <vs-th
                  class="column"
                  sort
                  @click="
                    products = $vs.sortData($event, products, 'productInfo')
                  "
                >
                  상세설명
                </vs-th>
                <vs-th
                  class="column"
                  sort
                  @click="ordproductsers = $vs.sortData($event, products)"
                >
                  삭제하기
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
                  <div class="productImage">
                    <div>
                      <vs-avatar>
                          <img
                            v-bind:src="
                              'http://localhost:8080/products/' +
                              product.productId +
                              '/images/THUMBNAIL1'
                            "
                            alt=""
                          />
                      </vs-avatar>
                    </div>
                    <div class="productName">
                      {{ product.productName }}
                    </div>
                  </div>

                </vs-td>
                <vs-td>
                  {{ product.rprice.toLocaleString() }}원
                </vs-td>
                <vs-td>
                  {{ product.dprice.toLocaleString() }}원
                </vs-td>
                <vs-td>
                  {{ product.stock }}개
                </vs-td>
                <vs-td>{{ product.productInfo.substring(0, 10) }} </vs-td>

                <vs-td>
                  <vs-button
                        
                        danger
                        @click="removeProduct(product.productId)"
                      >
                        Remove
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
import ProductAdd from "./ProductAdd.vue";

export default {
  data() {
    return {
      search: "",
      products: [],
      page: 1,
      max: 5,
      selected: [],
    };
  },
  mounted() {
    this.getProducts();
  },
  components: {
    ProductAdd,
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
    removeProduct: function (productId) {

      console.log('productId = '+productId);

      http
        .delete("/dashboard/products/" + productId)
        .then((response) => {
          if (response.status == 200) {
            alert("상품이 삭제되었습니다.");
            //productId로 products의 인덱스 찾기
            let index = 0;
            for(let i=0; i<this.products.length; i++) {
              if(this.products[i].productId == productId) {
                index = i;

                console.log('i = '+i);

                break;
              }
            }
            console.log(this.products.length);
            this.products.splice(index, 1);
            console.log(this.products.length);
          }
        })
        //해당 row 사라짐
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
.productImage div{
  float: left;
  text-align: center;
}
.productName{
  padding: 10px 10px 5px 10px;
}
</style>
