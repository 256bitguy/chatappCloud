 import   { useEffect, useState } from 'react'
 import client,{ databases ,DATABASE_ID,COLLECTION_ID_MESSSAGE} from '../appwriteconfig'
 import { ID,Query } from 'appwrite' ;
 import Header from "../components/Header"
import { userAuth } from '../utils/AuthContext';
 const Room = () => {
    const {user}=userAuth()
    const [messages,setMessages]=useState([]);
    const [messageBody,setMessageBody]=useState('');
     useEffect(()=>{
        getMessages()

        client.subscribe( `databases.${DATABASE_ID}.collections.${COLLECTION_ID_MESSSAGE}.documents`,  response => {
            // Callback will be executed on changes for documents A and all files.
            console.log('Real Time:',response);
        });
     },[])

     const handleSubmit=async (e)=>{
        e.preventDefault()

        let payload={
            user_id:user.$id,
            username:user.name,
            body:messageBody
        }
        let response =await databases.createDocument(
            DATABASE_ID,
            COLLECTION_ID_MESSSAGE,
            ID.unique(),
            payload
           
        )
        console.log('Created!',response)
        setMessages(PrevState=>[response,...messages])
        setMessageBody('')
     }
    const getMessages=async ()=>{
        const response=await databases.listDocuments(
            DATABASE_ID,
            COLLECTION_ID_MESSSAGE,
            [
                Query.orderDesc('$createdAt'),
                Query.limit(9)
            ]
            );
        console.log('RESPONSE:',response)
        setMessages(response.documents)
    }
    const deleteMessage =async(message_id)=>{
        databases.deleteDocument(
            DATABASE_ID,
            COLLECTION_ID_MESSSAGE,
            message_id
            );
            setMessages(prevState=>messages.filter(message=>message.$id !==message_id))
    }
   return (
     <div className='container'> 
            <Header/>
        <div className='room--container'>
            <form onSubmit={handleSubmit} id="message--form">
            <div>
                <textarea 
                 required
                 maxLength="1000"
                 placeholder="Say Something..."
                 onChange={(e)=>{setMessageBody(e.target.value)}}
                 value={messageBody}
                ></textarea>
            </div>
            <div className='send-btn--wrapper'>
                <input className="btn btn--secondary" type="submit" value="Send"/>
            </div>

            </form>
            <div>
            {
                messages.map((message)=>{
                     return(
                        
                        <div key={message.$id} className='message--wrapper'>
                        <div className='message--header'>
                            <p>
                                {message?.username ?(
                                    <span>{message.username}</span>
                                ):(
                                    <span>Anonymous user</span>
                                )}
                                                            <small className="message-timestamp">{new Date(message.$createdAt).toLocaleString()}</small>

                            </p>
                            <button onClick={()=>{deleteMessage(message.$id)}}>X</button>
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