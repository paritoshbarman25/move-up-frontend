import React, { useRef, useState } from 'react'
import '../styles/LoginPage.css'
import { useAuth } from "../context/AuthContext";
import { useEffect } from 'react';

export const LoginPage = () => {
    const passwordRef = useRef()
    const emailRef = useRef()
    const eyeRef = useRef()
    const RememberRef = useRef()
    const [eyeChange,setEyeChange] = useState(false)
    const { login } = useAuth();
    const [credentials, setCredentials] = useState({email:"", username:"", password:""})
    

    useEffect(()=>{
        if(localStorage.getItem("email") && localStorage.getItem("password")){
            emailRef.current.value = localStorage.getItem("email");
            passwordRef.current.value = localStorage.getItem("password");
            setCredentials({...credentials, email:localStorage.getItem("email"), password:localStorage.getItem("password")})
        }
    },[])

    function handleSubmit (e) {
        e.preventDefault();
        let credentialsObj = credentials
        credentialsObj.username = credentials.email
        console.log(credentialsObj);


        
        login(credentialsObj)
        console.log('Submited')

        // if(RememberRef.current.c)
        // console.log(RememberRef.current.value)
        // console.log(RememberRef.current.checked)\
        if(RememberRef.current.checked){
            console.log("remb is checked ")
            localStorage.setItem("email", emailRef.current.value)
            localStorage.setItem("password", passwordRef.current.value)
        }else{
            console.log("Is not checked ")
        }

        // localStorage.setItem("email",JSON.stringify(credentials))
    }

    function handleShowClick(){
        setEyeChange(!eyeChange);
        if(eyeChange === true){
            eyeRef.current.src="/images/eyecutlogo.png"
            passwordRef.current.type= "password"
        } 
        else{
            
            passwordRef.current.type= "text"
            eyeRef.current.src="/images/eyelogo.png"
        }
        
    }
    

    function inputHandle(e){
        setCredentials({...credentials, [e.target.name]:e.target.value}) 

    }



    
  return (
    <>
        <div className='container'>
            <div className='createAccountDiv'>
              <div className="truckTL">
                <div className="truckimg">
                    <img src="/images/truckicon.png" alt="" />
                </div>
                <div className='texTofCreate'><h1>ui unicon</h1></div>
                </div>
                <div className='formDetails'>
                    <form action="" onSubmit={handleSubmit}>            
                        <div className='lableBoth'>
                            <div className='emailLable'>
                                <label htmlFor=""> Login</label>
                            </div>
                            <div>
                                <input value={credentials.email} ref={emailRef} type="email" name='email' placeholder='Email' onChange={inputHandle}  />
                            </div>
                        </div>
                        <div className='passwordID lableBoth'>
                            <div className='passwordLable'>
                                <label htmlFor="">Password</label>
                            </div>
                            <div>
                                <input value={credentials.password} ref={passwordRef} type="password" name='password' placeholder='Password' onChange={inputHandle} />

                            </div>
                            <div className='eyeLogo' onClick={handleShowClick}>
                                <img ref={eyeRef} src="/images/eyecutlogo.png" alt="" />
                            </div>
                        </div>
                        <div className='checkandforget'>
                          <div>
                          <label htmlFor="RememberCheckbox">
                            <input className='checkbox' type="checkbox" ref={RememberRef} id='RememberCheckbox'/> Remember me
                            </label>
                          </div>
                          <div>
                            <a href="#">Forget ?</a>
                          </div>
                        </div>
                        <div className='continueWithGoogle'>
                            <button type="submit"> Sign in </button>
                        </div>
                    </form>
                </div>
                <div ><button className='googleIconwithCotinue'><img className='googleIcon' src="/images/googleimg.png" alt="googleIcon" />  Or sign in with google</button></div>
                <div className='goToLoginPage'><p>Dont have an account? <a href="/register">Sign up now</a></p></div>
            </div>
        </div>
    </>
)
}
