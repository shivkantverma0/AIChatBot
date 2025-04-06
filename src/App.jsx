import ChatbotIcon from "./components/Chatbotlcon";
import ChatForm from "./components/ChatForm";
import ChatMessage from "./components/ChatMessage";

import {useEffect, useRef, useState}  from "react";
const App =()=>{
  const [chatHistory,setChatHistory]=useState([
    
  ]);
  const chatBodyRef=useRef();
  const generateBotResponse=async (history) =>{
    const  updateHistory=(text,isError=false)=>{
      setChatHistory(prev=>[...prev.filter(msg=>msg.text!=="Thinking..."),{role:"model",text,isError}]);
    }
    history=history.map(({role,text})=>({role,parts:[{text}]}));
   
    const requestOptions={
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({contents:history})
    }
    try{
      const response=await fetch(import.meta.env.VITE_API_URL,requestOptions);
      const data =await response.json();
      if(!response.ok)throw new Error(data.error.message||"Something went wrong");

     const apiResponseText=data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g,"$1").trim();
          updateHistory(apiResponseText);
    }catch(error){
      updateHistory(error.message,true);
    };
    
  };
  useEffect(()=>{
    chatBodyRef.current.scrollTo({top: chatBodyRef.current.scrollHeight,behavior:"smooth"});
  },[chatHistory]);
  return(
    <div className="container">
      <div className="chatbot-popup">
        {/* chatbot header */}
        <div className="chat-header">
          <div className="header-info">
            <ChatbotIcon></ChatbotIcon>
            <h2 className="logo-text">Welcome to the world of ShivEra.</h2>
          </div>
          <button className="material-symbols-rounded">
                      keyboard_arrow_down
          </button>
        </div>{/* header close */}
        <div ref={chatBodyRef} className="chat-body">{/* body open */}
          <div className="message bot-message">
            <ChatbotIcon/>
            <p className="message-text">
            Hey there 💕🙏<br/>How can I help you today?
            </p>
          </div>
          {chatHistory.map((chat,index)=>(
            <ChatMessage key={index} chat={chat}/> 
          ))}
         
          </div>{/* end chat body */}
          {/* footer start */}
          <div className="chat-footer">
            <ChatForm chatHistory={chatHistory} setChatHistory={setChatHistory} generateBotResponse={generateBotResponse}/>
          </div>          {/* end footer */}
      </div>
    
    </div>
  )
};
export default App