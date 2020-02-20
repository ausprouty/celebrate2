<template>
  <div>
    <NavBar />
    <div v-if="!this.authorized">
      <p>
        You have stumbled into a restricted page. Sorry I can not show it to you
        now
      </p>
    </div>
    <div v-if="this.authorized">
      <h2>When do you want to throw a party?</h2>
      <p>Pick two or more of these and enter a goal</p>
      <form @submit.prevent="saveForm">
        <table class="goals">
          <tr>
            <th>Item</th>
            <th>Goal</th>
          </tr>
          <tr v-for="(item, id) in this.items" :key="id" :item="item" class="goals">
            <td class="item" @click="showDefinition(item)">
              {{ item.name }}
              <span :id="item.id" class="definition"></span>
            </td>
            <td>
              <input class="goal" type="text" v-model="goals[item.id]" />
            </td>
          </tr>
        </table>

        <br />
        <button class="button red" @click="addGoal">Add Personal Goal</button>
        <button class="button green" @click="saveForm">Update</button>
      </form>
    </div>
  </div>
</template>

<script>
import AuthorService from '@/services/AuthorService.js'
import NavBar from '@/components/NavBarAdmin.vue'

import { authorMixin } from '@/mixins/AuthorMixin.js'
export default {
  components: {
    NavBar
  },
  props: ['uid'],
  mixins: [authorMixin],
  data() {
    return {
      items: [],
      goals: []
    }
  },
  methods: {
    showDefinition(item) {
      var present = document.getElementById(item.id).innerHTML
      console.log(present)
      if (present == '') {
        document.getElementById(item.id).innerHTML =
          '<br>(' + item.paraphrase + ')'
      } else {
        document.getElementById(item.id).innerHTML = null
      }
    },
    async saveForm() {
      try {
        var params = {}
        console.log(this.items)
        console.log(this.goals)
        var plan = []
        var now = []
        var l = this.items.length
        for (var i = 0; i < l; i++) {
          now['id'] = this.items[i]['id']
          now['goal'] = 0
          if (typeof this.goals[i] != 'undefined') {
            now['goal'] = this.goals[i]
          }
          plan.push(now)
          now = []
        }
        console.log(plan)
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
        params.uid = this.uid
        this.items = await AuthorService.getStandardItems(params)
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
  color: red;
}
.definition {
  color: black;
  font-size: 14px;
}
td.goals {
  width: 20%;
}
.goals {
}
</style>
