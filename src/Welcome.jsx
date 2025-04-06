import { Link } from "react-router-dom";
import './Welcome.css'; 
const Welcome =()=>{
   return (
<div className="container">
    <div className="welcome-container">
      <Link to="/App"> <span>Welcome Shiv Era</span><br/>
        <span className="quote" >"Search anything for knowledge."</span></Link> 
    </div>

    <footer>
        © 2025 Shivkant. All rights reserved.
    </footer>
</div>
   )
};
export default Welcome;