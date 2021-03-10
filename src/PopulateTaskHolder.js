function populateTaskHolder() {
    TaskHolder.innerText = TaskList
  }
  
  // create task UUID for each when adding to list with nanoID; may need webpack
  // read the nanoid documentation to see if they had a CLI
  
  // render tasks (will need UUID), add delete/trash option, cross out done
  // first all, then sort by project, sort by date
  // just render checkbox, name, due date, edit, trash? ; colors and strikethru show priority.
  // edit can access notes, priority, project
  // jingle bells, journey, bon jovi, downtown train, waits fall in love
  
  // import { compareAsc, format } from 'date-fns'
  // format(new Date(2014, 1, 11), 'yyyy-MM-dd')