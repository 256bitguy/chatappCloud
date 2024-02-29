 import React, { useEffect, useState } from 'react'
 import { databases ,DATABASE_ID,COLLECTION_ID_MESSSAGE} from '../appwriteconfig'
 const Room = () => {
    const [messages,setMessages]=useState([])
     useEffect(()=>{
        getMessages()
     },[])

    const getMessages=async ()=>{
        const response=await databases.listDocuments(DATABASE_ID,COLLECTION_ID_MESSSAGE);
        console.log('RESPONSE:',response)
        setMessages(response.documents)
    }

   return (
     <div>
        <div>
            {
                messages.map((message)=>{
                     return(
                        <div key={message.$id}>
                        <div>
                            <span>{message.$createdAt}</span>
                            </div><div>
                            <span>{message.body}</span>
                            </div>
                     </div>
                     )
                })
            }
        </div>
     </div>
   )
 }
 
 export default Room