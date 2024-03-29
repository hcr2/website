function sortTable(table_name, n, is_number=true, is_first_column_rank = true) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  var content_x, content_y;
  table = document.getElementById(table_name);
  switching = true;
  //Set the sorting direction to descending:
  dir = "desc";
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /*check if the two rows should switch place,
      based on the direction, asc or desc:*/
      if (is_number) {
        content_x = Number(x.innerHTML);
        content_y = Number(y.innerHTML);
      } else {
        content_x = x.innerHTML;
        content_y = y.innerHTML;
      }
      if (dir == "asc") {
        if (content_x > content_y) {
          //if so, mark as a switch and break the loop:
          shouldSwitch= true;
          break;
        }
      } else if (dir == "desc") {
        if (content_x < content_y) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      //Each time a switch is done, increase this count by 1:
      switchcount ++;
    } else {
      /*If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again.*/
      if (switchcount == 0 && dir == "desc") {
        dir = "asc";
        switching = true;
      }
    }
  }
  if (is_first_column_rank) {
    for (i = 1; i < rows.length; i++) {
      x = rows[i].getElementsByTagName("TD")[0];
      x.innerHTML = i;
    }
  }
}
