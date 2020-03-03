<template>
  <div>
    <NavBar />
    <div v-if="!this.authorized">
      <p>
        You have stumbled into a restricted page. Sorry I can not show it to you
        now.
      </p>
    </div>
    <div v-if="this.authorized">
      <h2>What did the Holy Spirit enable you to do today?</h2>
      <div class="subheading">
        <form @submit.prevent="saveForm">
          <div v-for="(item, id) in this.items" :key="id" :item="item" class="progress">
            <div class="app-link">
              <div
                class="shadow-card -shadow"
                v-bind:class="{ important: evaluateSelect(item.goal_numbers) }"
              >
                <div class="container" @click="showDefinition(item)">
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
                    v-bind:class="{ selected: evaluateSelect(item.number) }"
                  >{{ item.name }}</div>
                  <div :id="item.id" class="collapsed">
                    <ItemEntryProgress :item="item"></ItemEntryProgress>
                  </div>
                </div>
                <hr />
                <div class="entry">
                  <BaseInput label="Number:" v-model="item.entry" type="number" class="field" />
                </div>
                <div v-if="item.entry > 0">
                  <div v-if="item.details">
                    <BaseTextarea
                      v-bind:label="item.details"
                      @click="showDetails(item)"
                      v-model="item.comment"
                      type="textarea"
                      class="field paragraph"
                    />
                    <div :id="item.id + 'Details'" class="collapsed">
                      <ItemEntryDetails :item="item"></ItemEntryDetails>
                    </div>
                  </div>
                  <BaseTextarea
                    label="Praise or Prayer Request"
                    type="textarea"
                    @click="showPrayer(item)"
                    v-model="item.prayer"
                    class="field paragraph"
                  />
                  <div :id="item.id + 'Prayer'" class="collapsed">
                    <ItemEntryPrayer :item="item"></ItemEntryPrayer>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button class="button green" @click="saveForm">Update</button>
        </form>
      </div>
      <button class="button red" @click="addItem">Add Item</button>
    </div>
  </div>
</template>

<script>
import AuthorService from '@/services/AuthorService.js'
import NavBar from '@/components/NavBarHamburger.vue'
import { mapState } from 'vuex'
import { integer } from 'vuelidate/lib/validators'
import { authorMixin } from '@/mixins/AuthorMixin.js'
export default {
  components: {
    NavBar
  },
  props: ['uid', 'tid'],
  computed: mapState(['user', 'appDir']),
  mixins: [authorMixin],
  data() {
    return {
      items: [],
      highlight: true
    }
  },
  validations: {
    items: {
      numbers: { integer }
    }
  },
  methods: {
    showDefinition(item) {
      var present = document.getElementById(item.id).innerHTML

      if (present == '') {
        var message = '<br>(' + item.paraphrase + ')'
        if (item.uid == this.$route.params.uid) {
          var link =
            message +
            '<br> <a href= "/user/' +
            this.$route.params.uid +
            '/item/' +
            item.id +
            '"> Update Item </a>'
          message = link
        }
        document.getElementById(item.id).innerHTML = message
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
    async addItem() {
      await this.saveForm()
      this.$router.push({
        name: 'myItem',
        params: {
          uid: this.$route.params.uid,
          tid: this.$route.params.tid
        }
      })
    },
    async updateItem(id) {
      await this.saveForm()
      this.$router.push({
        name: 'myItem',
        params: {
          uid: this.$route.params.uid,
          tid: this.$route.params.tid,
          id: id
        }
      })
    },
    async saveForm() {
      try {
        var params = {}
        var plan = []
        var now = {}
        var clean = 0
        var l = this.items.length
        for (var i = 0; i < l; i++) {
          now.id = this.items[i]['id']
          now.number = 0
          clean = parseInt(this.items[i]['number'], 10)
          if (typeof clean == 'number') {
            now.number = clean
          }
          plan.push(now)
          now = {}
        }
        params['goals'] = JSON.stringify(plan)
        params['uid'] = this.user.uid
        params['tid'] = this.user.team
        params['year'] = new Date().getFullYear()
        var res = await AuthorService.updateProgressToday(params)
      } catch (error) {
        console.log('There was an error in saveForm ', error) //
      }
    },
    async addGoal() {
      console.log('add Goal')
    }
  },
  async created() {
    this.authorized = this.authorize(
      'write',
      this.$route.params.uid,
      this.$route.params.tid
    )
    if (this.authorized) {
      try {
        var params = []
        var route = {}
        route.uid = this.$route.params.uid
        route.tid = this.user.team
        route.year = new Date().getFullYear()
        route.month = new Date().getMonth() + 1
        params['route'] = JSON.stringify(route)
        this.items = await AuthorService.getProgressToday(params)
      } catch (error) {
        console.log('There was an error in Team.vue:', error) // Logs out the error
      }
    }
  }
}
</script>

<style scoped>
white {
  background-color: white;
}
.center {
  text-align: center;
}
table.time {
  display: block;
  background-color: white;
  padding: 10px;
  width: 97%;
  margin: auto;
  padding-bottom: 20px;
}
tr.time {
  width: 100%;
}
td.left {
  background-color: purple;
  color: white;
  padding-left: 10px;
  font-size: 10px;
  text-align: left;
  width: 20%;
}
td.right {
  width: 20%;
  color: white;
  font-size: 10px;
  text-align: right;
  background-color: purple;
  padding-right: 10px;
}
a.left,
a.right {
  color: white;
  text-decoration: none;
}
td.center {
  width: 60%;
  text-align: center;
  font-weight: 900;
}
div.inline {
  display: inline;
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
.collapsed {
  padding: 0 18px;
  display: none;
  overflow: hidden;
  background-color: #f1f1f1;
}

td.item {
  width: 80%;
}
.item_name {
  color: black;
  font-weight: bold;
}

td.goals {
  width: 20%;
}
</style>
