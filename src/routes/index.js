import Vue from "vue";
import VueRouter from "vue-router";
//상품
import ProductAdmin from "../views/product/ProductAdmin.vue";
import ProductStock from "../views/product/ProductStock.vue";
import ProductAdd from "../views/product/ProductAdd.vue";
//오다
import OrderAll from "../views/order/OrderAll.vue";
import OrderPayS from "../views/order/OrderPayS.vue";
import OrderCanceled from "../views/order/OrderCanceled.vue";
import OrderDeliveryReady from "../views/order/OrderDeliveryReady.vue";
import OrderDeliveryDone from "../views/order/OrderDeliveryDone.vue";
//메인
import MainAdmin from "../views/MainAdmin.vue";
//고객
import UserAdmin from "../views/user/UserAdmin.vue";
//게시판
import Board from "../views/board/Board.vue";
import BoardContent from "../views/board/BoardContent.vue";
import BoardCreate from "../views/board/BoardCreate.vue";
//후기,질문
import Review from "../views/questions/Review.vue";
import Question from "../views/questions/Question.vue";
import QuestionComment from "../views/questions/QuestionComment.vue";

Vue.config.productionTip = false;

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: "history",
  routes: [
    //home
    {
      path: "/",
      //component: url 주소로 갔을 때 표시될 컴포넌트
      redirect: "/dashboard/home",
    },
    {
      path: "/dashboard/home",
      component: MainAdmin,
    },
    //상품
    {
      path: "/dashboard/products",
      component: ProductAdmin,
    },
    {
      path: "/dashboard/products/stock",
      component: ProductStock,
    },
    {
      path: "/dashboard/products/add",
      component: ProductAdd,
    },
    //주문
    {
      path: "/dashboard/orders",
      component: OrderAll,
    },
    {
      path: "/dashboard/orders/paysuccess",
      component: OrderPayS,
    },
    {
      path: "/dashboard/orders/deliveryReady",
      component: OrderDeliveryReady,
    },
    {
      path: "/dashboard/orders/deliveryDone",
      component: OrderDeliveryDone,
    },
    {
      path: "/dashboard/orders/canceled",
      component: OrderCanceled,
    },

    //고객
    {
      path: "/dashboard/users",
      component: UserAdmin,
    },
    
    //게시판
    {
      path: "/dashboard/board",
      component: Board,
    },
    {
      path: "/dashboard/board/boardcontent/:contentId",
      component: BoardContent,
    },
    {
      path: "/dashboard/board/boardcreate/",
      component: BoardCreate,
    },
    //후기와 질문
    {
      path: "/dashboard/review",
      component: Review,
    },
    {
      path: "/dashboard/question",
      component: Question,
    },
    {
      path: "/dashboard/questioncomment/:id",
      name: "QuestionComment",
      component: QuestionComment,
    },
  ],
});
