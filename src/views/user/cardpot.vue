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