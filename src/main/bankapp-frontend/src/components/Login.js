import React, { useState } from 'react'
import { useNavigate , Link } from 'react-router-dom';
import AuthService from './../services/auth.service';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const Auth = async (e) => {
        e.preventDefault();
        try {
            await AuthService.login(email, password).then((response) => {
                notifySuccess("Logged in Successfully");
                navigate(`/dashboard/${email}`);
            }).catch((e) => {
                notifyError(e.response.data.message);
            });
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }

    const notifySuccess = (msg) => toast.info(msg);
    const notifyError = (msg) => toast.error(msg);


    return (
        <section className="hero has-background-grey-light is-fullheight is-fullwidth">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-4-desktop">
                            <form onSubmit={Auth} className="box">
                                <p className="has-text-centered">{msg}</p>
                                <div className="field mt-5">
                                    <label className="label">Username</label>
                                    <div className="controls">
                                        <input type="text" className="input" placeholder="Username" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Password</label>
                                    <div className="controls">
                                        <input type="password" className="input" placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <button className="button is-success is-fullwidth">Login</button>
                                </div>
                                <div className="has-text-centered">
                                    <Link to="/register">Don't you have an account? Sign up now!</Link>
                                </div>
                            </form>
                        </div>
                      
                    </div>
                </div>
            </div>
            <ToastContainer />
        </section>
    )
}

export default Login