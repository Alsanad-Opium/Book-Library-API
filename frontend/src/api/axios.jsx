import axios from 'axios';

const api = axios.create({
    baseURL :"http://127.0.0.1:5000/api/" // this is the base URL for all our API requests. It points to our Flask backend.

});


api.interceptors.request.use((config)=>{
// an interceptor runs automatically before every request you make. Think of it as a middleware for your frontend. Industry standard pattern for handling auth tokens.
    
    const token = localStorage.getItem('token');

    if (token){
        config.headers.Authorization = `Bearer ${token}`; //config.headers.Authorization = \Bearer ${token}`** — attaches the token to every request automatically. This is why @jwt_required()` works on the backend — it looks for this exact header format.
    }
    return config ;
});
// you must return the config or the request won't go through.

export default api