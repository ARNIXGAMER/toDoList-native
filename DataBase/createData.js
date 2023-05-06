import { collection, addDoc, getDocs, doc } from "firebase/firestore";
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
  const querySnapshot = await getDocs(collection(db, "tasks"));
  querySnapshot.forEach((doc) => {
    if (doc.id !== taskId) {
      return doc;
    } else {
      return doc.ref.delete();
    }
  });
};
export const findTasksDb = async (userId) => {
  const tasks = [];
  try {
    const querySnapshot = await getDocs(collection(db, "tasks")); 
      querySnapshot.forEach((doc) => {
      if (doc._document.data.value.mapValue.fields.userId.stringValue === userId) {
        tasks.push({title:doc._document.data.value.mapValue.fields.title.stringValue,done:doc._document.data.value.mapValue.fields.done.booleanValue,userId:doc._document.data.value.mapValue.fields.userId.stringValue,id:doc._document.data.value.mapValue.fields.id});
      }}
      )
  } catch (error) {
    console.log(error)
  }
  console.log(tasks)
  return tasks;
};
// export const findAllTasksDb = async() =>{
//     const querySnapshot = await getDocs(collection(db, "tasks"));
//     setTasks([...tasks,querySnapshot])
//     return tasks
// }
