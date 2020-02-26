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
      <h2>What has God enabled you to do?</h2>
      <form @submit.prevent="saveForm">
          <div v-for="(item, id) in this.items" :key="id" :item="item" class="progress">
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
              class="item"
              @click="showDefinition(item)"
              v-bind:class="{ selected: evaluateSelect(item.number) }"
            
              {{ item.name }}
              <span :id="item.id" class="definition"></span>
            </div>
            <td :id="item.id + 'R'" class="goal">
              <input class="goal" type="text" v-model="item.number" />
            </td>
          </tr>
        </table>

        <br />

        <button class="button green" @click="saveForm">Update</button>
      </form>
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

    async saveForm() {
      
    },
   
  },
  async created() {
    this.authorized = this.authorize('write', this.uid)
    if (this.authorized) {
      try {
        var params = {}
        params['route'] = JSON.stringify(this.$route.params)
        var picture =  await AuthorService.getImagePage(params)
        console.log (picture)
        var progress =  await AuthorService.getProgress(params)
        console.log (progress)
        this.items = await AuthorService.getGoals(params)
          console.log (this.items)
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
  color: blue;
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
