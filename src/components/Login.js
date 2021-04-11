import { Button } from '@material-ui/core'
import React from 'react'
import './Login.css'
import { auth, provider } from '../firebase'
import {useStateValue} from '../StateProvider'
import {actionTypes} from '../Reducer'

const Login = () => {
    
    const [{}, dispatch] = useStateValue();

    const signIn = () => {
        auth.signInWithPopup(provider)
        .then((result) => {
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user
            });
            console.log(dispatch);
            console.log(result.user);
        })
        .catch((error) => alert(error.message));
    }

    const signInAnon = () => {
        dispatch({
            type: actionTypes.SET_USER,
            user: {
                displayName: "Anonymous User"
            }
        });
    }

    return (
        <div className="login">
            <div className="login__container">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/598px-WhatsApp.svg.png"
                    alt="whatsapp logo"
                />
                <div className="login__text">
                    <h1>Sign in</h1>
                </div>
                <div>
                    <Button type="submit" onClick={signIn}>
                        Sign in with Google
                    </Button>
                </div>
                <div>
                    <Button type="submit" onClick={signInAnon}>
                        Sign in anonymously
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Login
