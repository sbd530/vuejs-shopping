<template>
  <div class="pom">
    <vs-button
      class="add-button"
      gradient
      variant="outline-primary"
      @click="active = !active"
    >
      Product-Add
    </vs-button>
    <vs-dialog v-model="active">
      <div class="centerx"></div>
      <b-container class="bv-example-row">
        <b-row class="top"> </b-row>

        <b-row class="mainname">
          <b-row>
            <b-col>Products-Add</b-col>

            <b-col align="right" class="save"
              ><b-button
                class="save-button"
                variant="outline-primary"
                @click="addProduct()"
                >Save</b-button
              ></b-col
            >
          </b-row>
        </b-row>
        <b-row class="box bottom">
          <b-col>
            Thumbnail1
            <b-form-file
              v-model="file1"
              :state="Boolean(file1)"
              placeholder="Choose a file or drop it here..."
              drop-placeholder="Drop file here..."
            ></b-form-file>
          </b-col>
          <b-col>
            Thumbnail2
            <b-form-file
              v-model="file2"
              :state="Boolean(file2)"
              placeholder="Choose a file or drop it here..."
              drop-placeholder="Drop file here..."
            ></b-form-file>
          </b-col>
        </b-row>
        <b-row class="box bottom">
          <b-col>
            Contents1
            <b-form-file
              v-model="file3"
              :state="Boolean(file3)"
              placeholder="Choose a file or drop it here..."
              drop-placeholder="Drop file here..."
            ></b-form-file>
          </b-col>
          <b-col>
            Contents2
            <b-form-file
              v-model="file4"
              :state="Boolean(file4)"
              placeholder="Choose a file or drop it here..."
              drop-placeholder="Drop file here..."
            ></b-form-file>
          </b-col>
        </b-row>
        <b-row class="box bottom">
          <b-col>
            <label for="input-live">Name</label>
            <b-form-input
              v-model="productName"
              placeholder="Product Name"
            ></b-form-input>
          </b-col>
          <b-col>
            <label for="input-live">Price</label>
            <b-form-input
              v-model="rprice"
              placeholder="Price"
              @keyup="updateDprice()"
            ></b-form-input
          ></b-col>
          <b-col>
            <label for="input-live">Discount Price</label>
            <b-form-input
              v-model="dprice"
              placeholder="Discount Price"
            ></b-form-input
          ></b-col>
        </b-row>
        <b-row class="box bottom">
          <b-col>
            <label for="input-live">Stock</label>
            <b-form-input v-model="stock" placeholder="Stock"></b-form-input>
          </b-col>
          <b-col>
            <label for="input-live">Product Description</label><br />
            <textarea
              v-model="productInfo"
              placeholder="Product Description"
              style="width: 360px; border: 1px #ced4da solid"
            ></textarea>
          </b-col>
        </b-row>
      </b-container>
    </vs-dialog>
  </div>
</template>

<script>
import http from "../../http-common";

export default {
  data() {
    return {
      formData: new FormData(),
      active: false,
      file1: null,
      file2: null,
      file3: null,
      file4: null,
      productName: "",
      productInfo: "",
      rprice: 0,
      dprice: 0,
      stock: 1,
      page: 1,
      max: 5,
    };
  },
  computed: {
    rows() {
      return this.orders.length;
    },
  },
  methods: {
    addProduct: function () {
      this.formData.append("file1", this.file1);
      this.formData.append("file2", this.file2);
      this.formData.append("file3", this.file3);
      this.formData.append("file4", this.file4);
      this.formData.append("productName", this.productName);
      this.formData.append("productInfo", this.productInfo);
      this.formData.append("rprice", this.rprice);
      this.formData.append("dprice", this.dprice);
      this.formData.append("stock", this.stock);
      http
        .post("/dashboard/products/add", this.formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.status == 200) {
            //alert("상품이 등록되었습니다.");
            this.file1 = null;
            this.file2 = null;
            this.file3 = null;
            this.file4 = null;
            this.productName = "";
            this.productInfo = "";
            this.rprice = 0;
            this.dprice = 0;
            this.stock = 1;
            this.formData = new FormData();
            this.active = false;
            this.$emit('save');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateDprice: function () {
      this.dprice = this.rprice;
    },
  },
};
</script>

<style lang="stylus">
.labelx
  .vs-input
    margin 50px
    padding-right 100px
</style>
<style scoped>
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");

* {
  font-family: "Noto Sans KR", sans-serif;
}
.add-button {
  width: 150px;
  height: 40px;
  font-size: 15px;
}
.save {
  margin-left: 100px;
  padding: 0;
}
.save-button {
  width: 100px;
}
.mainname {
  font-size: 25pt;
  margin: 10px 50px 0 50px;

  height: 30px;
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
  font-size: 12pt;
  height: 30px;
}
.bottom {
  padding-top: 60px;
}
.table {
  font-size: 20pt;
}
</style>
