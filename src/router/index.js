import Vue from "vue";
import VueRouter from "vue-router";
//import HomeView from "../views/HomeView.vue";
import { Auth } from "@/services";

Vue.use(VueRouter);

const routes = [
  /*{
    path: "/",
    name: "home",
    component: HomeView,
  },*/
  {
    path: "/",
    name: "landingpage",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/LandingPageView.vue"),
  },
  {
    path: "/register",
    name: "register",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/RegisterView.vue"),
  },
  {
    path: "/login",
    name: "login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/LoginView.vue"),
  },
  {
    path: "/posts",
    name: "posts",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/PostsView.vue"),
  },
  {
    path: "/info",
    name: "info",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/InfoForumView.vue"),
  },
  {
    path: "/post/:id",
    name: "post-single",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/PostSingleView.vue"),
  },

  {
    path: "/encyclopedia",
    name: "encyclopedia",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/EncyclopediaView.vue"),
  },
  {
    path: "/encyclopedia/:id",
    name: "encyclopedia-item",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/EncyclopediaItemView.vue"
      ),
  },
  {
    path: "/edit-profile",
    name: "edit-profile",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/EditProfileView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  const publicRoutes = ["/", "/about", "/login", "/register"];
  const loginPotreban = !publicRoutes.includes(to.path);
  let user = await Auth.getUser();
  if (loginPotreban && !user.token) {
    next("/login");
    return;
  }

  next();
});
export default router;
