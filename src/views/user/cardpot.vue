
          
            
            <td :id="item.id + 'R'" class="goal">
              <input class="goal" type="text" v-model="item.number" />
            </td>
          </tr>
        </table>

        <br />

        <button class="button green" @click="saveForm">Update</button>
      </form>