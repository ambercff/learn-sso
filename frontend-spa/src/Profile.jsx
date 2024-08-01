import axios from "axios";
import { useEffect, useState } from "react";

function Profile(){
    const [principal, setPrincipal] = useState({});

    useEffect(() => {
        axios({
            baseURL: "http://localhost:3000/userinfo",  // Ajuste o baseURL conforme necessário
        })
        .then(res =>{
            const token = res.data.idToken;
            setPrincipal(res.data),
            localStorage.setItem("idToken", token)

        })
        .catch(err => console.error("Erro ao carregar informações do perfil:", err));
    }, []);


    const handleFetchResource = () => {
        const idToken = localStorage.getItem("idToken")
        if(idToken){
            axios({
                method: 'get',
                url: "http://localhost:3000/resource",  // Ajuste a URL do recurso protegido conforme necessário
                headers: {
                    Authorization: `Bearer ${idToken}`
                },
            })
            .then(res => {
                // Aqui você pode manipular a resposta, se necessário
                console.log("Resposta do recurso protegido:", res.data);
            })
            .catch(err => {
                if (err.response) {
                    console.error("Erro ao acessar recurso protegido:", err);
                    console.log("Headers:", err.response.headers);
                } else {
                    console.error("Erro ao acessar recurso protegido:", err.message);
                }
            });
        } else {
            console.log("TOKEN UNDEFINED")
        }

    };

    return (
        <>
            <div className="container">
                <br />
                <h1>Oauth 2.0 Login with Spring Security</h1>
                <div>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                        <button
                            className="btn btn-lg btn-primary me-md-2"
                            onClick={handleFetchResource}
                            style={{marginTop: '10px'}}
                        >
                            Recurso Protegido
                        </button>
                    </div>
                </div>
                <br />
                <div>
                    You are successfully logged in <span style={{fontWeight: 'bold'}}> {principal.name}</span>&nbsp;via the OAuth 2.0 Client <span style={{fontWeight:'bold'}}> {principal.clientName}</span> with id token <span style={{fontWeight: 'bold', overflow: 'auto'}}> {principal.idToken}</span>
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
    );
}

export default Profile;