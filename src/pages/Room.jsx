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
     <div className='container'> 
        <div className='room--container'>
            <div>
            {
                messages.map((message)=>{
                     return(
                        
                        <div key={message.$id} className='messages--wrapper'>
                        <div className='message--header'>
                            <small className="message-timestamp">{message.$createdAt}</small>
                            </div>
                            <div className='message--body'>
                            <span>{message.body}</span>
                            </div>
                     </div>
                     )
                })
            }
            </div>
        </div>
     </div>
   )
 }
 
 export default Room