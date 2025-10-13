const API_BASE_URL = 'http://localhost:5000/auth';

async function loginUser(email, password){

    try{

      const response = await fetch(`${API_BASE_URL}/login`,
        {
             method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', 
            body: JSON.stringify({ email: email, password: password }),
        });
        
        if (!response.ok){
            
            let errorData = {};
            const responseText = await response.text();
            
            if (responseText) {
                try {
                    errorData = JSON.parse(responseText);
                } catch (jsonError) {
                    
                }
            }
            
            throw new Error(errorData.message || `Error ${response.status} en la petición de login.`);
        }

        return await response.json();

    } 
    catch(error)
    {
        console.error("Error en loginUser (authService):", error.message);
        throw error;
    }
}

export {
    loginUser
};