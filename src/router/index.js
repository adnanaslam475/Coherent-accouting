import Vue from 'vue'
import VueRouter from 'vue-router'
import { isUserLoggedIn, getUserData, getHomeRouteForLoggedInUser } from '@/auth/utils'
import { i18n } from '../main'
import useJwt from '@/auth/jwt/useJwt'
Vue.use(VueRouter)

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
      meta: {
        pageTitle: 'Home',
        breadcrumb: [
          {
            text: 'Home',
            active: true,
          },
        ],
      },
    },
    {
      path: '/second-page',
      name: 'second-page',
      component: () => import('@/views/SecondPage.vue'),
      meta: {
        pageTitle: 'Second Page',
        breadcrumb: [
          {
            text: 'Second Page',
            active: true,
          },
        ],
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '/login/advertisements',
      name: 'login-advertisement',
      component: () => import('@/views/Login-ads.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/Register.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '/register/advertisements',
      name: 'register-advertisement',
      component: () => import('@/views/Register-ads.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/About.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '/forgot-password',
      name: 'auth-forgot-password',
      component: () => import('@/views/ForgotPassword.vue'),
      meta: {
        layout: 'full',
        resource: 'Auth',
        redirectIfLoggedIn: true,
      },
    },
    {
      path: '/account/forgot-password',
      name: 'auth-reset-password-v1',
      component: () => import('@/views/ResetPassword-v1.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '/reset-password-email',
      name: 'reset-password-email-v1',
      component: () => import('@/views/ResetPasswordEmail-v1.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '/pricing',
      name: 'pricing',
      component: () => import('@/views/Pricing.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '/questions',
      name: 'questions',
      component: () => import('@/views/Questions.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '/error-404',
      name: 'error-404',
      component: () => import('@/views/error/Error404.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '*',
      redirect: 'error-404',
    },
    // Companies routes starting from here
    {
      path: '/companies',
      name: 'companies',
      component: () => import('@/views/company/Index.vue'),
      meta: {
        pageTitle: 'Companies',
        breadcrumb: [
          {
            text: 'Companies',
            active: true,
          },
        ],
      }
    },
    // Invoice routes starting from here
    {
      path:'/invoices',
      name: 'invoices',
      component: () => import('@/views/invoice/Index.vue'),
      meta: {
        pageTitle: 'Invoices',
        breadcrumb: [
          {
            text: 'Invoices',
            active: true,
          },
        ],
      }
    },
    // Videos routes starting from here
    {
      path:'/videos',
      name: 'videos',
      component: () => import('@/views/videos/Index.vue'),
      meta: {
        pageTitle: 'Videos',
        breadcrumb: [
          {
            text: 'Videos',
            active: true,
          },
        ],
      }
    },
    // Tickets routes starting from here
    {
      path:'/tickets',
      name: 'tickets',
      component: () => import('@/views/tickets/Index.vue'),
      meta: {
        pageTitle: 'Tickets',
        breadcrumb: [
          {
            text: 'Tickets',
            active: true,
          },
        ],
      }
    },
    // My Plans routes starting from here
    {
      path:'/my-plans',
      name: 'my-plans',
      component: () => import('@/views/Plans/Index.vue'),
      meta: {
        pageTitle: 'Plans',
        breadcrumb: [
          {
            text: 'Plans',
            active: true,
          },
        ],
      }
    },
    // Settings routes starting from here
    {
      path:'/settings',
      name: 'settings',
      component: () => import('@/views/Settings/Index.vue'),
      meta: {
        pageTitle: 'Settings',
        breadcrumb: [
          {
            text: 'Settings',
            active: true,
          },
        ],
      }
    },
    // Contacts routes starting from here
    {
      path:'/contacts',
      name: 'contacts',
      component: () => import('@/views/Contacts/Index.vue'),
      meta: {
        pageTitle: 'Contacts',
        breadcrumb: [
          {
            text: 'Contacts',
            active: true,
          },
        ],
      }
    },
  ],
})

router.beforeEach((to, from, next) => {
  i18n.locale = localStorage.getItem('language') || 'en'
  return next()
})

// router.beforeEach((to, _, next) => {
//   const isLoggedIn = isUserLoggedIn()
//     if (to.name == "/" || to.name == "home") {
//       if (!isLoggedIn) return next({ name: 'login' })

//       if (!isLoggedIn) {
//         const userData = getUserData()
//         next(getHomeRouteForLoggedInUser(userData ? userData.role : null))
//       }
//       return next()

//     }
//     // else if( to.name == "auth-reset-password-v1"){

//     //   let tokenUrl = window?.location?.search?.split('=')[1] ? window.location.search.split('=')[1] : ""

//     //   if(tokenUrl){
//     //     useJwt.clientToken()
//     //       .then(res => {
//     //           let token = res.data.access_token
//     //           useJwt.verifyToken(token,tokenUrl)
//     //             .then(response => {
//     //               console.log("response",response)

//     //               return this.$router.push('/')
//     //             })
//     //             .catch(error => {

//     //             })
//     //       })
//     //       .catch(error => {

//     //       })
//     //   } else {
//     //     return next()
//     //   }

//     // }

//     else{
//       return next()
//     }
// })

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

export default router
