<template>
  <div>
    <h2>Enter a Personal Item</h2>
    <form @submit.prevent="saveForm">
      <BaseInput
        v-model="this.item.name"
        label="Item"
        type="text"
        class="field"
        :class="{ error: this.item.name.$error }"
        @blur="this.item.name.$touch()"
      />
      <BaseInput
        v-model="this.item.paraphrase"
        label="Description"
        type="text"
        class="field"
        :class="{ error: this.item.paraphrase.$error }"
        @blur="this.item.paraphrase.$touch()"
      />
      <BaseInput
        v-model="this.item.details"
        label="Any details you want to track?"
        type="text"
        class="field"
        :class="{ error: this.item.details.$error }"
        @blur="this.item.details.$touch()"
      />
      <BaseSelect
        label="Record Number?"
        :options="yes_or_no"
        v-model="this.item.details"
        class="field"
      />
      <div v-if="this.item.details == 'Y'">
        <BaseSelect
          label="Cumulative"
          :options="yes_or_no"
          v-model="this.item.cumulative"
          class="field"
        />
      </div>
    </form>
  </div>
</template>
<script>
import AuthorService from '@/services/AuthorService.js'
import { required } from 'vuelidate/lib/validators'
import { mapState } from 'vuex'
import { authorMixin } from '@/mixins/AuthorMixin.js'
export default {
  computed: mapState(['user']),
  props: {},
  mixins: [authorMixin],
  data() {
    return {
      yes_or_no: ['Y', 'N'],
      item: {
        id: null,
        celebration_set: null,
        tid: null,
        uid: null,
        sequence: null,
        page: null,
        code: null,
        name: null,
        definition: null,
        paraphrase: null,
        details: null,
        numbers: 'Y',
        cumulative: 'Y'
      }
    }
  },
  validations: {
    item: {
      id: {},
      celebration_set: {},
      tid: {},
      uid: {},
      sequence: {},
      page: {},
      code: {},
      name: { required },
      definition: {},
      paraphrase: { required },
      details: {},
      numbers: { required },
      cumulative: { required }
    }
  },
  async created() {
    //this.authorized = this.authorize('write', this.uid)
    this.authorized = true
    if (this.authorized) {
      try {
        var params = {}
        params['uid'] = this.uid
        params['tid'] = this.user.team
        // this.items = await AuthorService.getGoals(params)
      } catch (error) {
        console.log('There was an error in Team.vue:', error) // Logs out the error
      }
    }
  }
}
</script>