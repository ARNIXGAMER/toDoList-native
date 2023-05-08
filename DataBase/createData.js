import { collection, addDoc, getDocs,deleteDoc, doc, getDoc, updateDoc, where, query } from "firebase/firestore";
import { db } from "../firebase";

// const [tasks, setTasks] = useState([])
export const createTaskDb = async ({ title, done, userId }) => {
  try {
    const docRef = await addDoc(collection(db, "tasks"), {
      title,
      done,
      userId,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const deleteTaskDb = async (taskId) => {
  console.log(taskId)
  const querySnapshot = await deleteDoc(doc(db, 'tasks',taskId));
  console.log(querySnapshot)
};
export const findTasksDb = async (userId) => {
  const tasks = [];
  try {
    const querySnapshot = await getDocs(query(collection(db, "tasks"), where("userId", "==", userId))); 
      querySnapshot.forEach((doc) => {
      if (doc._document.data.value.mapValue.fields.userId.stringValue === userId) {
        tasks.push({title:doc._document.data.value.mapValue.fields.title.stringValue,done:doc._document.data.value.mapValue.fields.done.booleanValue,userId:doc._document.data.value.mapValue.fields.userId.stringValue,id:doc.id});
      }}
      )
  } catch (error) {
    console.log(error)
  }
  return tasks;
};
export const findTaskDb = async (taskId) => {
  try {
    const querySnapshot = await getDoc(doc(db, "tasks",taskId));
    return querySnapshot
  } catch (error) {
    console.log(error)
  }
};
export const updateTaskDb = async (taskId,newTask,oldTask) => {
  console.log(taskId,newTask,oldTask, 'tasks')
  try {
    const taskUpdated = await updateDoc(doc(db, "tasks",taskId),{title:newTask.title !== '' ? newTask.title : oldTask.title, done: newTask.title === '' ? !oldTask.done : oldTask.done});
    console.log(taskUpdated)
  } catch (error) {
    console.log(error)
  }
};
// export const findAllTasksDb = async() =>{
//     const querySnapshot = await getDocs(collection(db, "tasks"));
//     setTasks([...tasks,querySnapshot])
//     return tasks
// }
