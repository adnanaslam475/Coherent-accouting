<template>
  <div class="navbar-container d-flex content align-items-center">

    <!-- Nav Menu Toggler -->
    <ul class="nav navbar-nav d-xl-none">
      <li class="nav-item">
        <b-link class="nav-link" @click="toggleVerticalMenuActive">
          <feather-icon
            icon="MenuIcon"
            size="21"
          />
        </b-link>
      </li>
    </ul>

    <!-- Left Col -->
    <div class="bookmark-wrapper align-items-center flex-grow-1 d-none d-lg-flex">
      <dark-Toggler class="d-none d-lg-block"/>
    </div>

    <b-navbar-nav class="nav align-items-center ml-auto">
      <!-- For Multilingual -->
      <b-nav-item-dropdown
          id="dropdown-grouped"
          variant="link"
          class="dropdown-language"
          right
      >
        <template #button-content>
          <b-img
              :src="currentLocale.img"
              height="14px"
              width="22px"
              :alt="currentLocale.locale"
          />
          <span class="ml-50 text-body">{{ currentLocale.name }}</span>
        </template>
        <b-dropdown-item
            v-for="localeObj in locales"
            :key="localeObj.locale"
            @click="changeLanguage(localeObj)"
        >
          <b-img
              :src="localeObj.img"
              height="14px"
              width="22px"
              :alt="localeObj.locale"
          />
          <span class="ml-50">{{ localeObj.name }}</span>
        </b-dropdown-item>
      </b-nav-item-dropdown>
      <!-- For Multilingual -->
      <b-nav-item-dropdown
          class="dropdown-notification mr-25"
          menu-class="dropdown-menu-media"
          right
      >
        <template #button-content>
          <feather-icon
              badge="6"
              badge-classes="bg-danger"
              class="text-body"
              icon="BellIcon"
              size="21"
          />
        </template>

        <!-- Header -->
        <li class="dropdown-menu-header">
          <div class="dropdown-header d-flex">
            <h4 class="notification-title mb-0 mr-auto">
              Notifications
            </h4>
            <b-badge
                pill
                variant="light-primary"
            >
              6 New
            </b-badge>
          </div>
        </li>

        <!-- Notifications -->
        <vue-perfect-scrollbar
            v-once
            :settings="perfectScrollbarSettings"
            class="scrollable-container media-list scroll-area"
            tagname="li"
        >
          <!-- Account Notification -->
          <b-link
              v-for="notification in notifications"
              :key="notification.subtitle"
          >
            <b-media>
              <template #aside>
                <b-avatar
                    size="32"
                    :src="notification.avatar"
                    :text="notification.avatar"
                    :variant="notification.type"
                />
              </template>
              <p class="media-heading">
            <span class="font-weight-bolder">
              {{ notification.title }}
            </span>
              </p>
              <small class="notification-text">{{ notification.subtitle }}</small>
            </b-media>
          </b-link>

          <!-- System Notification Toggler -->
          <div class="media d-flex align-items-center">
            <h6 class="font-weight-bolder mr-auto mb-0">
              System Notifications
            </h6>
            <b-form-checkbox
                :checked="true"
                switch
            />
          </div>

          <!-- System Notifications -->
          <b-link
              v-for="notification in systemNotifications"
              :key="notification.subtitle"
          >
            <b-media>
              <template #aside>
                <b-avatar
                    size="32"
                    :variant="notification.type"
                >
                  <feather-icon :icon="notification.icon" />
                </b-avatar>
              </template>
              <p class="media-heading">
            <span class="font-weight-bolder">
              {{ notification.title }}
            </span>
              </p>
              <small class="notification-text">{{ notification.subtitle }}</small>
            </b-media>
          </b-link>
        </vue-perfect-scrollbar>

        <!-- Cart Footer -->
        <li class="dropdown-menu-footer"><b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
            block
        >Read all notifications</b-button>
        </li>
      </b-nav-item-dropdown>

      <b-nav-item-dropdown
          right
          toggle-class="d-flex align-items-center dropdown-user-link"
          class="dropdown-user"
      >
        <template #button-content>
          <div class="d-sm-flex d-none user-nav">
            <p class="user-name font-weight-bolder mb-0">
              John Doe
            </p>
            <span class="user-status">Admin | {{ $t('home') }}</span>
          </div>
          <b-avatar
              size="40"
              variant="light-primary"
              badge
              :src="require('@/assets/images/avatars/13-small.png')"
              class="badge-minimal"
              badge-variant="success"
          />
        </template>

        <b-dropdown-item link-class="d-flex align-items-center">
          <feather-icon
              size="16"
              icon="UserIcon"
              class="mr-50"
          />
          <span>Profile</span>
        </b-dropdown-item>

        <b-dropdown-item link-class="d-flex align-items-center">
          <feather-icon
              size="16"
              icon="MailIcon"
              class="mr-50"
          />
          <span>Inbox</span>
        </b-dropdown-item>

        <b-dropdown-item link-class="d-flex align-items-center">
          <feather-icon
              size="16"
              icon="CheckSquareIcon"
              class="mr-50"
          />
          <span>Task</span>
        </b-dropdown-item>

        <b-dropdown-item link-class="d-flex align-items-center">
          <feather-icon
              size="16"
              icon="MessageSquareIcon"
              class="mr-50"
          />
          <span>Chat</span>
        </b-dropdown-item>

        <b-dropdown-divider/>

        <b-dropdown-item link-class="d-flex align-items-center">
          <feather-icon
              size="16"
              icon="LogOutIcon"
              class="mr-50"
          />
          <span>Logout</span>
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </div>
</template>

<script>
import {
  BLink,
  BNavbarNav,
  BNavItemDropdown,
  BDropdownItem,
  BDropdownDivider,
  BAvatar,
  BImg,
  BBadge,
  BMedia,
  BButton,
  BFormCheckbox
} from 'bootstrap-vue'
import DarkToggler from '@core/layouts/components/app-navbar/components/DarkToggler.vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import Ripple from 'vue-ripple-directive'
import axiosIns from '@/libs/axios'

export default {
  components: {
    BLink,
    BNavbarNav,
    BNavItemDropdown,
    BDropdownItem,
    BDropdownDivider,
    BAvatar,
    BImg,

    BBadge,
    BMedia,
    VuePerfectScrollbar,
    BButton,
    BFormCheckbox,

    // Navbar Components
    DarkToggler,
  },
  directives: {
    Ripple,
  },
  methods: {
    changeLanguage(obj) {
      localStorage.setItem('language', obj.locale)
      this.$i18n.locale = obj.locale
    },
    async getNotifications() {
      const notifications = await axiosIns.get('account/api/notification/list/1/10?sortField=sentDate&direction=desc')
      console.log(notifications)
    },
  },
  computed: {
    currentLocale() {
      return this.locales.find(l => l.locale === this.$i18n.locale)
    },
  },
  setup() {
    /* eslint-disable global-require */
    const locales = [
      {
        locale: 'en',
        img: require('@/assets/images/flags/en.png'),
        name: 'English',
      },
      {
        locale: 'bg',
        img: require('@/assets/images/flags/bg.png'),
        name: 'Bulgaria',
      },
    ]
    /* eslint-disable global-require */
    /* eslint-disable global-require */
    const notifications = [
      {
        title: 'Congratulation Sam 🎉',
        avatar: require('@/assets/images/avatars/6-small.png'),
        subtitle: 'Won the monthly best seller badge',
        type: 'light-success',
      },
      {
        title: 'New message received',
        avatar: require('@/assets/images/avatars/9-small.png'),
        subtitle: 'You have 10 unread messages',
        type: 'light-info',
      },
      {
        title: 'Revised Order 👋',
        avatar: 'MD',
        subtitle: 'MD Inc. order updated',
        type: 'light-danger',
      },
    ]
    /* eslint-disable global-require */

    const systemNotifications = [
      {
        title: 'Server down',
        subtitle: 'USA Server is down due to hight CPU usage',
        type: 'light-danger',
        icon: 'XIcon',
      },
      {
        title: 'Sales report generated',
        subtitle: 'Last month sales report generated',
        type: 'light-success',
        icon: 'CheckIcon',
      },
      {
        title: 'High memory usage',
        subtitle: 'BLR Server using high memory',
        type: 'light-warning',
        icon: 'AlertTriangleIcon',
      },
    ]

    const perfectScrollbarSettings = {
      maxScrollbarLength: 60,
      wheelPropagation: false,
    }

    return {
      locales,
      notifications,
      systemNotifications,
      perfectScrollbarSettings,
    }
  },
  props: {
    toggleVerticalMenuActive: {
      type: Function,
      default: () => {
      },
    },
  },
  created() {
    this.getNotifications()
  },
}
</script>
