<template>
  <div class="navbar-container d-flex content align-items-center">

    <!-- Nav Menu Toggler -->
    <ul class="nav navbar-nav d-xl-none">
      <li class="nav-item">
        <b-link
          class="nav-link"
          @click="toggleVerticalMenuActive"
        >
          <feather-icon
            icon="MenuIcon"
            size="21"
          />
        </b-link>
      </li>
    </ul>

    <!-- Left Col -->
    <div class="bookmark-wrapper align-items-center flex-grow-1 d-none d-lg-flex">
      <!--      <dark-Toggler class="d-none d-lg-block"/>-->
    </div>

    <b-navbar-nav class="nav align-items-center ml-auto">
      <dark-Toggler class="d-none d-lg-block" />
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
            :badge="notificationCount"
            badge-classes="bg-danger"
            class="text-body"
            icon="BellIcon"
            size="21"
            @click="getNotifications()"
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
              {{ notificationCount }} New
            </b-badge>
          </div>
        </li>

        <!-- Notifications -->
        <vue-perfect-scrollbar
          :settings="perfectScrollbarSettings"
          class="scrollable-container media-list scroll-area"
          tagname="li"
          @ps-scroll-y="handleScroll"
        >
          <b-link
            v-for="notification in notifications"
            :key="notification.id"
            @click="markNotificationAsRead(notification.id)"
          >
            <b-media :class="notification.read ? '' : 'unread'">
              <template #aside>
                <b-avatar
                  size="32"
                  :variant="notification.notificationSeverityType === 'INFO' ? 'light-success' :
                    notification.notificationSeverityType === 'WARNING' ? 'light-info' : 'light-danger'"
                >
                  <feather-icon
                    :icon="
                      notification.notificationSeverityType === 'INFO' ? 'CheckIcon' :
                      notification.notificationSeverityType === 'WARNING' ? 'AlertTriangleIcon' : 'XIcon'"
                  />
                </b-avatar>
              </template>
              <p class="media-heading">
                <span class="font-weight-bolder">
                  {{ notification.subject }}
                </span>
              </p>
              <small class="notification-text">{{ notification.message }}</small>
            </b-media>
          </b-link>
        </vue-perfect-scrollbar>

        <!-- Cart Footer -->
        <li class="dropdown-menu-footer">
          <b-button
            :disabled="notificationCount === 0"
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
            block
            @click="markNotificationReadAll()"
          >Read all notifications
          </b-button>
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
            src="JD"
            text="JD"
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

        <b-dropdown-divider />

        <b-dropdown-item
          link-class="d-flex align-items-center"
          @click="logout"
        >
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
  BFormCheckbox,
} from 'bootstrap-vue'
import DarkToggler from '@core/layouts/components/app-navbar/components/DarkToggler.vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import Ripple from 'vue-ripple-directive'
// eslint-disable-next-line import/no-duplicates
import axiosIns from '@/libs/axios'
import { ref } from '@vue/composition-api'
// eslint-disable-next-line import/no-duplicates
import axios from '@/libs/axios'
import useJwt from '@/auth/jwt/useJwt'

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
    // eslint-disable-next-line vue/no-unused-components
    BFormCheckbox,

    // Navbar Components
    DarkToggler,
  },
  directives: {
    Ripple,
  },
  props: {
    toggleVerticalMenuActive: {
      type: Function,
      default: () => {
      },
    },
  },
  computed: {
    currentLocale() {
      return this.locales.find(l => l.locale === this.$i18n.locale)
    },
  },
  created() {
    this.getNotificationCount()
    this.getNotifications()
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      const container = this.$el.querySelector('.ps-container')
      if (container.scrollTop + container.clientHeight >= container.scrollHeight - 5) {
        this.page += 1
        this.getNotifications()
      }
    },
    changeLanguage(obj) {
      localStorage.setItem('language', obj.locale)
      this.$i18n.locale = obj.locale
    },
    async getNotifications() {
      const data = await axios.get(`account/api/notification/list/${this.page}/10?sortField=sentDate&direction=desc`)
      if (this.page > 1) {
        this.notifications.push(...data.data.elements)
      } else {
        this.notifications = data.data.elements
      }
    },
    async getNotificationCount() {
      const dataCount = await axios.get('account/api/notification/get-message-count-not-read')
      this.notificationCount = dataCount.data.unreadCount
    },
    async markNotificationAsRead(id) {
      const messageIds = [id]
      const index = this.notifications.findIndex(notification => notification.id === id)
      if (this.notifications[index].read === false) {
        const data = await axios.put('account/api/notification/mark-as-read', messageIds)
        if (data.status === 200) {
          this.notifications[index].read = true
          // eslint-disable-next-line no-plusplus
          this.notificationCount--
        }

      }
    },
    async markNotificationReadAll() {
      const data = await axios.put('account/api/notification/mark-all-as-read')
      if (data.status === 200) {
        await this.getNotifications()
        await this.getNotificationCount()
      }
    },
    logout() {
      // Remove userData from localStorage
      // ? You just removed token from localStorage. If you like, you can also make API call to backend to blacklist used token
      localStorage.removeItem(useJwt.jwtConfig.storageTokenKeyName)
      localStorage.removeItem(useJwt.jwtConfig.storageRefreshTokenKeyName)

      // Remove userData from localStorage
      localStorage.removeItem('userData')

      // Redirect to login page
      this.$router.push({ name: 'login' })
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

    const notificationCount = 0
    const page = 1
    const notifications = ref([])

    const perfectScrollbarSettings = {
      maxScrollbarLength: 40,
      wheelPropagation: false,
    }

    return {
      page,
      locales,
      notificationCount,
      notifications,
      perfectScrollbarSettings,
    }
  },
}
</script>
