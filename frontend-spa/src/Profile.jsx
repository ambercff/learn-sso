import axios from "axios";
import { useEffect, useState } from "react";

function Profile(){
    const [principal, setPrincipal] = useState({})

    // Pode substituir por localStorage

    useEffect(() => {
        axios({
            baseURL: "http://localhost:3000/userinfo"
        })
        .then(res => setPrincipal(res.data))
    }, [])

    return (
        <>
            <div className="container">
                <br />
                <h1>Oauth 2.0 Login with Spring Security</h1>
                <div>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                        <a className="btn btn-lg btn-primary me-md-2" href="/resource" role="link" style={{marginTop: '10px'}}>Recurso Protegido</a>
                    </div>
                </div>
                <br />
                <div>
                    You are successfully logged in <span style={{fontWeight: 'bold'}}> {principal.name}</span>&nbsp;via the OAuth 2.0 Client <span style={{fontWeight:'bold'}}> {principal.clientName}</span> with id token <span style={{fontWeight: 'bold', overflow: 'auto'}}> {principal.token}</span>
                </div>
                <div>&nbsp;</div>
                <div>
                    <span style={{fontWeight: 'bold'}}> User Attributes: </span>
                    <ul>
                        {principal && principal.userAttributes && Object.entries(principal.userAttributes).map(([key,value]) => (
                            <li key={key}>
                                <span style={{fontWeight: 'bold'}}> {key} </span>: <span> {value} </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Profile