import logo from './logo.svg';
import './App.css';
import Model3D from './components/Model3D';
import { useEffect, useState } from 'react';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from './utils/firebase';

function App() {
  
  const [userCounter, setUserCounter] = useState(0);

  /*useEffect(() => { 
    const readDB = async () => {
      const userCollection = collection(db, "users");
      const userSnapshot =  await getDocs(userCollection);
      const numUsers = userSnapshot.size;
      setUserCounter(numUsers);
      console.log(`Hay ${numUsers} usuarios en la base de datos`);
      userSnapshot.docs.forEach(userData => console.log(userData.data()));
    };

    readDB();
  }, [userCounter]);*/

  useEffect(() => { 
      const userCollection = collection(db, "users");
      const userSnapshot =  onSnapshot(userCollection,(snapshot) => {
        const numUsers = snapshot.size;
        setUserCounter(numUsers);
        console.log(`Hay ${numUsers} usuarios en la base de datos`);
        snapshot.docs.forEach(userData => console.log(userData.data()));
      });
      
      return () => userSnapshot();
  }, []);

  return (
    <div>
      <Model3D/>
    </div>
  );
}

export default App;
