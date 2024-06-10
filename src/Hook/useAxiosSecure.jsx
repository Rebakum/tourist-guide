import axios from "axios";


 const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
})
const useAxiosSecure = () => {
    axiosSecure.interceptors.request.use(function(config){
        const token = localStorage.getItem('access-token')
        console.log('request stoppted by interceptors', token)
        config.headers.authorization = `Bearer ${token}`
        return config
    }, function(error){
        return Promise.reject(error);
    });
    // interceptor 401, 403 
   axiosSecure.interceptors.response.use(function(response){

        return response;
    }, (error)=>{
        console.log('status error in the interceptor', error)
       return Promise.reject(error);
    })
   

    return axiosSecure;
}
export default useAxiosSecure;

