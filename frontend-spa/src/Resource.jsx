// Resource.js
import axios from "axios";
import { useEffect, useState } from "react";

function Resource({ token }) {
    const [resource, setResource] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        if (token) {
            axios({
                method: 'get',
                url: "http://localhost:3000/resource",  // Ajuste a URL do recurso protegido conforme necessário
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
            .then(res => {
                // Atualiza o estado com a resposta do recurso protegido
                setResource(res.data);
            })
            .catch(err => {
                setError(err);
                if (err.response) {
                    console.error("Erro ao acessar recurso protegido:", err);
                    console.log("Headers:", err.response.headers);
                } else {
                    console.error("Erro ao acessar recurso protegido:", err.message);
                }
            });
        }
    }, [token]);

    return (
        <div>
            <h2>Protected Resource</h2>
            {error && <p style={{ color: 'red' }}>Erro ao carregar recurso protegido.</p>}
            <div dangerouslySetInnerHTML={{ __html: resource }} />
        </div>
    );
}

export default Resource;
