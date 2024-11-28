# This is a crud operation to showcase how javascript nodejs file handling works in real life project..

# Where filehandling was embedded

In the code we developed for to-do list application, file handling is embedded in two critical areas:

# 1. loading the tasks from the file and saving them back to the file.

The two core functions that handle file operations are loadTasks and saveTasks. in line 14 of the backend index.js

# 2. Saving Tasks to the File (saveTasks function)

This function is called whenever there are changes to the tasks list (such as adding, updating, or deleting tasks). It converts the todos array into a JSON string and writes it back to the tasks.json file using fs.writeFileSync. in line 48 of the frontend script.js

npx nodemon backend/index.js
