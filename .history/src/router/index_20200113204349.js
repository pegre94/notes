import Vue from 'vue';
import VueRouter from 'vue-router';
// import Editor from 'src/components/Tools/Editor.vue;
// import svgSpriteLoader from 'src/helpers/svg-sprite-loader.js';
import routes from './routes';

// const __svg__ = {
//   path: "./assets/images/icons/*.svg",
//   name: "assets/images/[hash].sprite.svg"
// };
// svgSpriteLoader(__svg__.filename);
Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,
    linkActiveClass: 'is-active',
    linkExactActiveClass: 'is-exact-active',
    Editor,
    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  return Router
}
