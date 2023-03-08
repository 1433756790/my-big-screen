import Vue from "vue";
import VueRouter from "vue-router";
const Index = () => import("../views/Index");
const About = () => import("../views/About");
const Seller = () => import("../components/pages/seller");
const Trend = () => import("../components/pages/trend");
const Map = () => import("../components/pages/map");
const Rank = () => import("../components/pages/rank");
const Hot = () => import("../components/pages/hot");
const Stock = () => import("../components/pages/stock");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "About",
    component: Trend,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
