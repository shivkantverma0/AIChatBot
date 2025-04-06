import {useRef } from "react";

const ChatForm=({chatHistory,setChatHistory,generateBotResponse})=>{
   const inputRef=useRef();

   const handleFormSubmit = (e) =>{
      e.preventDefault();
      const userMessage=inputRef.current.value.trim();
      if(!userMessage) return;
      inputRef.current.value="";

      setChatHistory((history)=>[...history,{role:"user",text:userMessage}]);
      // time
      setTimeout(()=>{
         setChatHistory((history)=>[...history,{role:"model",text:"Thinking..."}]);
         generateBotResponse([...chatHistory,{role:"model",text:userMessage}]);
      },600);
      console.log(userMessage);
      
   };

   return(
      <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
              <input ref={inputRef} type="text" className="message-input" required placeholder="Type message here..." />
              <button className="material-symbols-rounded">
              arrow_upward
</button>

            </form>
   )
};
export default ChatForm;