<template>
  <div>
    <NavBar />
    <div v-if="!this.authorized">
      <p>
        You have stumbled into a restricted page. Sorry I can not show it to you
        now.
      </p>
    </div>
    <div v-if="this.authorized" class="white">
      <p>
        <img v-bind:src="appDir.members + this.user.image" class="member" />
        {{ this.time }}
      </p>
      <div class="center">
        <table class="heading">
          <tr>
            <td class="picture">
              <img
                v-bind:src="
                  appDir.page_images +
                    this.$route.params.page +
                    '/' +
                    this.picture
                "
                class="picture"
              />
            </td>
            <td class="objective">
              <p class="objective">{{ this.objective }}</p>
              <ul class="motto">
                <li class="motto">Connect with Jesus today.</li>
                <li class="motto">Impact the nation tomorrow.</li>
                <li class="motto">Change the world for eternity</li>
              </ul>
            </td>
          </tr>
        </table>

        <h2>What has the Holy Spirit empowered people to do or become?</h2>
      </div>
      <div class="subheading">
        <form @submit.prevent="saveForm">
          <div v-for="(item, id) in this.items" :key="id" :item="item" class="progress">
            <div class="app-link">
              <div
                class="shadow-card -shadow"
                v-bind:class="{ important: evaluateSelect(item.goal_numbers) }"
              >
                <div class="container">
                  <div class="icon">
                    <img
                      v-bind:src="
                        appDir.icons + item.celebration_set + '/' + item.image
                      "
                      class="icon"
                    />
                  </div>
                  <div
                    :id="item.id + 'R'"
                    class="item_name"
                    @click="showDefinition(item)"
                    v-bind:class="{ selected: evaluateSelect(item.number) }"
                  >
                    {{ item.name }}
                    <span :id="item.id" class="definition"></span>
                  </div>
                </div>
                <hr />
                <div class="entry">
                  <BaseInput label="Number:" v-model="item.entry" type="number" class="field" />
                </div>
                <div v-if="item.details">
                  <BaseTextarea
                    v-bind:label="item.details"
                    v-model="item.comment"
                    type="textarea"
                    class="field paragraph"
                  />
                </div>
                <BaseTextarea
                  label="Praise or Prayer Request"
                  type="textarea"
                  v-model="item.prayer"
                  class="field paragraph"
                />
              </div>
            </div>
          </div>
        </form>
        <div v-if="this.$route.params.page > 0" class="left">
          <button class="button green left" @click="previousForm"><</button>
        </div>
        <div v-if="this.$route.params.page < 5" class="right">
          <button class="button green right" @click="nextForm">></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AuthorService from '@/services/AuthorService.js'
import NavBar from '@/components/NavBarAdmin.vue'
import { mapState } from 'vuex'
import { integer } from 'vuelidate/lib/validators'
import { authorMixin } from '@/mixins/AuthorMixin.js'
export default {
  components: {
    NavBar
  },

  props: ['uid', 'tid', 'year', 'month', 'page'],
  computed: mapState(['user', 'appDir', 'months']),
  mixins: [authorMixin],
  data() {
    return {
      items: [],
      progress: [],
      highlight: true,
      picture: null,
      objective: null,
      time: null
    }
  },
  validations: {
    item: {
      numbers: { integer }
    }
  },
  methods: {
    showDefinition(item) {
      var present = document.getElementById(item.id).innerHTML

      if (present == '') {
        var message = '<br>' + item.paraphrase + '<br>'
        if (item.uid == this.$route.params.uid) {
          var link =
            '<br> <a href= "/user/' +
            this.$route.params.uid +
            '/item/' +
            item.id +
            '"> Update Item </a><br>'
          var table_start = '<table class = "progress_table">'
          var past =
            '<tr> <td class="row_label"> Last month</td><td class="row_value">' +
            item.previous_entry +
            '</td></tr>'
          var calculated = null
          if (item.cumulative == 'Y') {
            calculated =
              '<tr> <td class="row_label">Total for year</td><td class="row_value">' +
              item.calculated_entry +
              '</td></tr>'
          } else {
            calculated =
              '<tr> <td class="row_label">Average for year </td><td class="row_value">' +
              item.calculated_entry +
              '</td></tr>'
          }
          var goal = null
          if (item.goal_numbers) {
            goal =
              '<tr> <td class="row_label"> Goal</td><td class="row_value">' +
              item.goal_numbers +
              '</td></tr>'
          }
          var table_end = '</table>'
          var complete =
            message + table_start + past + calculated + goal + table_end + link
        }
        document.getElementById(item.id).innerHTML = complete
      } else {
        document.getElementById(item.id).innerHTML = null
      }
    },
    evaluateSelect(quantity) {
      if (quantity > 0) {
        return true
      }
      return false
    },
    async previousForm() {
      var prev = parseInt(this.$route.params.page, 10) - 1
      this.$route.params.page = prev
      this.loadForm()
    },
    async nextForm() {
      this.saveForm()
      var next = parseInt(this.$route.params.page, 10) + 1
      this.$route.params.page = next
      this.loadForm()
    },

    async saveForm() {
      var params = {}
      params['route'] = JSON.stringify(this.$route.params)
      params['items'] = JSON.stringify(this.items)
      await AuthorService.updateProgressPageEntry(params)
      console.log('finished save')
    },
    async loadForm() {
      this.authorized = this.authorize('write', this.uid)
      if (this.authorized) {
        try {
          var params = {}
          params['route'] = JSON.stringify(this.$route.params)
          this.picture = await AuthorService.getImagePage(params)
          this.items = await AuthorService.getProgressPageEntry(params)
          this.objective = this.items[0]['objective']
          this.time =
            this.months[this.$route.params.month] +
            ',  ' +
            this.$route.params.year
          console.log(this.items)
        } catch (error) {
          console.log('There was an error in MyProgress.vue:', error) // Logs out the error
        }
      }
    }
  },
  async created() {
    this.loadForm()
  }
}
</script>

<style scoped>
.white {
  background-color: white;
}
.center {
  text-align: center;
}
table.heading {
  display: block;
  background-color: rgb(243, 243, 148);
  padding: 10px;
  width: 97%;
  margin: auto;
}
td.picture {
  width: 50%;
}
td.objective {
  width: 45%;
}
div.subheading {
  display: block;
}
img.picture {
  width: 100%;
}
div.icon {
  display: inline;
}
img.icon {
  width: 48px;
  padding-right: 10px;
}

div.shadow-card {
  display: block;
}
.shadow-card {
  background-color: #d2bcbc;
  cursor: pointer;
  margin-bottom: 10px;
  padding: 5px;
  text-align: left;
  transition: all 0.2s linear;
  width: 100%;
}
.important {
  background-color: rgb(243, 243, 148);
}

div.item_name {
  display: inline;
}

p.objective {
  padding-left: 10px;
  color: black;
  font-weight: 700;
  font-size: 16px;
  margin-top: -5px;
  margin-bottom: 0px;
}
ul.motto {
  margin-top: 0px;
  padding-inline-start: 20px;
}
li.motto {
  color: black;
  padding-left: 0px;
  font-size: 12px;
  font-style: italic;
}
div.left {
  display: inline;
}
div.right {
  float: right;
}
.goal {
  color: green;
  line-height: 18px;
}
table.progress_table {
  width: 100%;
}
td.row_label {
  width: 80%;
}
td.row_value {
  width: 20%;
  text-align: right;
}
td.item {
  width: 80%;
}
.item_name {
  color: black;
  font-weight: bold;
}
.definition {
  color: red;
  font-size: 14px;
}

td.goals {
  width: 20%;
}
</style>
