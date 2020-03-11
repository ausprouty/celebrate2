<template>
  <div class="white">
    <NavBar />
    <div v-if="!this.authorized" class="not_authorized">
      <p>
        You have stumbled into a restricted page. Sorry I can not show it to you
        now.
      </p>
    </div>
    <div v-if="this.authorized" >
      <div class="app-link">
        <div
          class="shadow-card -shadow"
          v-bind:class="{
            not_current: this.evaluateCurrent(this.member.current)
          }"
        >
          <img v-bind:src="appDir.members + this.member.image" class="member" />

          <div class="card-names">
            <span class="card-name">{{ this.member.firstname }} {{ this.member.lastname }}</span>
          </div>
        </div>
      </div>
      <h1 v-if="missingMonths(this.missing)">Needs progress for these months:</h1>
      <div v-for="missed in missing">
        <p class="months" @click="openProgress(missed)">{{ months[missed] }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import AuthorService from '@/services/AuthorService.js'
import NavBar from '@/components/MyNavBar.vue'

import { mapState } from 'vuex'
import { authorMixin } from '@/mixins/AuthorMixin.js'

export default {
  components: {
    NavBar
  },

  props: ['uid', 'tid'],
  computed: mapState(['user', 'appDir', 'months']),
  mixins: [authorMixin],
  data() {
    return {
      member: {},
      missing: []
    }
  },
  methods: {
    evaluateCurrent(current) {
      if (current == 'Y') {
        return false
      }
      return true
    },
    missingMonths(missing) {
      if (missing.length == 0) {
        return false
      }
      return true
    },
    openProgress(month) {
      this.$router.push({
        name: 'myMonth',
        params: {
          uid: this.$route.params.uid,
          tid: this.$route.params.tid,
          year: this.$route.params.year,
          month: month
        }
      })
    },
    async loadForm() {
      this.authorized = this.authorize('team', null, this.$route.params.tid)
      if (this.authorized) {
        try {
          var params = []
          params['uid'] = this.$route.params.uid
          var d = new Date()
          if (typeof this.$route.params.year == 'undefined') {
            this.$route.params.year = d.getFullYear()
          }
          if (typeof this.$route.params.month == 'undefined') {
            //this will actually give you the previous month since it starts the array at 0
            this.$route.params.month = d.getMonth()
          }
          params['route'] = JSON.stringify(this.$route.params)
          this.member = await AuthorService.getUser(params)
          this.missing = await AuthorService.getMemberReportsCurrent(params)

          console.log('this.missing')
          console.log(this.missing)
        } catch (error) {
          console.log('There was an error in TeamMemberReports.vue:', error) // Logs out the error
        }
      }
    }
  },

  beforeCreate: function() {
    document.body.className = 'team'
  },
  async created() {
    this.loadForm()
  }
}
</script>
<style scoped>

img.icon {
  width: 48px;
}
.shadow-card {
  background-color: #d2bcbc;
  background-color: #bfbdee;
  cursor: pointer;
  margin-bottom: 10px;
  padding: 5px;
  text-align: left;
  transition: all 0.2s linear;
  width: 95%;
}
.not_current {
  background-color: #dee597;
}
div.card-names {
  float: right;
  font-size: 18px;
  vertical-align: top;
  width: 70%;
  line-height: 60px;
}
.card-name {
  font-weight: bold;
  line-height: 20px;
}
.months {
  font-size: 18pt;
  padding-left: 20px;
}
</style>