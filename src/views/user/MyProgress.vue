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
      <h2>What has God enabled you to do?</h2>
      <div class="heading">
        <div class="picture">
          <img
            v-bind:src="
              appDir.page_images + this.$route.params.page + '/' + this.picture
            "
            class="picture"
          />
        </div>
        <div class="objective">
          <p class="objective">{{ this.objective }}</p>
          <ul class="motto">
            <li class="motto">Connect to Jesus today.</li>
            <li class="motto">Impact the nation tomorrow.</li>
            <li class="motto">Change the world for eternity</li>
          </ul>
        </div>
      </div>
      <div>
        <form @submit.prevent="saveForm">
          <div v-for="(item, id) in this.items" :key="id" :item="item" class="progress">
            <div>
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
              >
                {{ item.name }}
                <span :id="item.id" class="definition"></span>
              </div>
            </div>
            <BaseInput label="Number" v-model="item.entry" type="text" class="field" />
            <div v-if="item.details">
              <BaseTextarea
                v-bind:label="item.details"
                v-model="item.comment"
                type="text"
                class="field paragraph"
              />
            </div>
            <BaseTextarea
              label="Praise or Prayer Request"
              type="text"
              v-model="item.prayer"
              class="field paragraph"
            />
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
  computed: mapState(['user', 'appDir']),
  mixins: [authorMixin],
  data() {
    return {
      items: [],
      progress: [],
      entry_number: [],
      entry_text: [],
      entry_prayer: [],
      highlight: true,
      picture: null,
      objective: null
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
img.picture {
  width: 100%;
}
div.icon {
  display: inline;
}
img.icon {
  width: 48px;
  margin-top: 20px;
}
div.item {
  display: inline;
}
div.left {
  display: inline;
}
div.right {
  float: right;
}
div.picture {
  float: left;
  width: 50%;
}
div.objective {
  float: left;
  width: 50%;
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
  color: green;
  padding-left: 0px;
  font-size: 12px;
  font-style: italic;
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
