// src/router.js
import { createRouter, createWebHistory } from "vue-router";
import SearchCapture from "./components/searchCapture.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import Profile from "./components/Profile.vue";
import CreateGroup from "./components/CreateGroup.vue";
import Dex from "./components/Dex.vue";

const routes = [
  { path: "/search", component: SearchCapture },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/profile", component: Profile },
  { path: "/groups/create", component: CreateGroup },
  { path: "/", component: Dex },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
