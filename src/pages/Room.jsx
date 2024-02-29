 import React, { useEffect } from 'react'
 import { databases ,DATABASE_ID,COLLECTION_ID_MESSSAGE} from '../appwriteconfig'
 const Room = () => {
     useEffect(()=>{
        getMessages()
     },[])

    const getMessages=async ()=>{
        const response=await databases.listDocuments(DATABASE_ID,COLLECTION_ID_MESSSAGE);
        console.log('RESPONSE:',response)
    }

   return (
     <div>'Room</div>
   )
 }
 
 export default Room