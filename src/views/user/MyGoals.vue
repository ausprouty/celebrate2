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
      <h2>When do you want to throw a party?</h2>
      <p>Pick two or more of these and enter a goal.</p>
      <form @submit.prevent="saveForm">
        <table class="goals">
          <tr>
            <th>Item</th>
            <th>Goal</th>
          </tr>
          <tr v-for="(item, id) in this.items" :key="id" :item="item" class="goals">
            <td
              :id="item.id + 'R'"
              class="item"
              @click="showDefinition(item)"
              v-bind:class="{ selected: evaluateSelect(item.number) }"
            >
              {{ item.name }}
              <span :id="item.id" class="definition"></span>
            </td>
            <td :id="item.id + 'R'" class="goal">
              <input class="goal" type="text" v-model="item.number" />
            </td>
          </tr>
        </table>

        <br />

        <button class="button green" @click="saveForm">Update</button>
      </form>
      <button class="button red" @click="addItem">Add Personal Item</button>
    </div>
  </div>
</template>

<script>
import AuthorService from '@/services/AuthorService.js'
import NavBar from '@/components/NavBarAdmin.vue'
import { mapState } from 'vuex'
import { authorMixin } from '@/mixins/AuthorMixin.js'
export default {
  components: {
    NavBar
  },
  props: ['uid'],
  computed: mapState(['user']),
  mixins: [authorMixin],
  data() {
    return {
      items: [],
      highlight: true
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
          uid: this.$route.params.uid
        }
      })
    },
    async updateItem(id) {
      await this.saveForm()
      this.$router.push({
        name: 'myItem',
        params: {
          uid: this.$route.params.uid,
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
        var res = await AuthorService.updateGoals(params)
      } catch (error) {
        console.log('There was an error in saveForm ', error) //
      }
    },
    async addGoal() {
      console.log('add Goal')
    }
  },
  async created() {
    this.authorized = this.authorize('write', this.uid)
    if (this.authorized) {
      try {
        var params = {}
        params['uid'] = this.uid
        params['tid'] = this.user.team
        params['year'] = new Date().getFullYear()
        this.items = await AuthorService.getGoals(params)
      } catch (error) {
        console.log('There was an error in Team.vue:', error) // Logs out the error
      }
    }
  }
}
</script>

<style scoped>
table.goals {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

tr:hover {
  background-color: #ddd;
}
td,
th {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: center;
  background-color: #4caf50;
  color: white;
}
.goal {
  color: green;
  line-height: 18px;
}
td.item {
  width: 80%;
}
.item {
  color: black;
}
.definition {
  color: red;
  font-size: 14px;
}

td.goals {
  width: 20%;
}
.selected {
  background-color: yellow;
}
</style>
