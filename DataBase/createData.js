import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
  where,
  query,
  getFirestore,
} from "firebase/firestore";
import { deleteIcon, uploadIcon } from "./uploadIcons";
import { db } from "../firebase";

// const [tasks, setTasks] = useState([])
export const createTaskDb = async ({ title, icon, done, userId }) => {
  try {
    const { url, iconName } = await uploadIcon(icon);
    const docRef = await addDoc(collection(db, "tasks"), {
      title,
      icon: url ? url : "",
      iconName: iconName ? iconName : "",
      done,
      userId,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const deleteTaskDb = async (taskId) => {
  const task = await findTaskDb(taskId);
  if (task._document.data.value.mapValue.fields.iconName.stringValue) {
    await deleteIcon(
      task._document.data.value.mapValue.fields.iconName.stringValue
    );
  }
  const querySnapshot = await deleteDoc(doc(db, "tasks", taskId));
  console.log(querySnapshot);
};
export const findTasksDb = async (userId) => {
  const tasks = [];
  try {
    const querySnapshot = await getDocs(
      query(collection(db, "tasks"), where("userId", "==", userId))
    );
    querySnapshot.forEach((doc) => {
      if (
        doc._document.data.value.mapValue.fields.userId.stringValue === userId
      ) {
        tasks.push({
          title: doc._document.data.value.mapValue.fields.title.stringValue,
          icon: doc._document.data.value.mapValue.fields.icon.stringValue,
          iconName:
            doc._document.data.value.mapValue.fields.iconName.stringValue,
          done: doc._document.data.value.mapValue.fields.done.booleanValue,
          userId: doc._document.data.value.mapValue.fields.userId.stringValue,
          id: doc.id,
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
  return tasks;
};
export const updateTaskDb = async (taskId, updateTask) => {
  try {
    if (updateTask.icon.length >= 200) {
      await deleteIcon(updateTask.iconName);
      const { url, iconName } = await uploadIcon(updateTask.icon);
      updateTask.icon = url;
      updateTask.iconName = iconName;
    }
    console.log(updateTask)
    const taskUpdated = await updateDoc(doc(db, "tasks", taskId), updateTask);
    console.log(taskUpdated);
  } catch (error) {
    console.log(error);
  }
};
export const findTaskDb = async (taskId) => {
  try {
    const querySnapshot = await getDoc(doc(db, "tasks", taskId));
    return querySnapshot;
  } catch (error) {
    console.log(error);
  }
};
// export const findAllTasksDb = async() =>{
//     const querySnapshot = await getDocs(collection(db, "tasks"));
//     setTasks([...tasks,querySnapshot])
//     return tasks
// }
