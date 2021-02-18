import { history } from './../../index';
import axios, { AxiosResponse } from 'axios';
import {IActivity} from '../../model/IActivity';
import { toast } from 'react-toastify';
import { IUser, IUserFormValues } from '../../model/User';
axios.defaults.baseURL='http://localhost:5000/';

axios.interceptors.request.use((config)=>{
    const token=window.localStorage.getItem('jwt');
    console.log('interceptors',token);
    if(token) config.headers.Authorization=`Bearer ${token}`;
    return config;

},error=>{
    return Promise.reject(error);
})

axios.interceptors.response.use(undefined,error=>{

    
    if(error.message==='Network Error' && !error.response)
    {
        console.log(error);
        toast.error('Network error, please ensure app server is running');
    }
    else{
        const {status,config,data}=error.response;
        if(status===404){
        history.push('/notfound');
        }

        else if(status===400 && config.method==='get' && data.errors.hasOwnProperty('Id')){
            history.push('/notfound');
        }
        else if(status===500)
        {
            toast.error('Internal server error, please contact terminal')
        }
    }
 throw error.response;
});

const responceBody=(responce:AxiosResponse) => responce.data;
const sleep=(ms:number)=> (responce:AxiosResponse)=>new Promise<AxiosResponse>(resolve=>setTimeout(()=>resolve(responce),ms));

const requests ={
    get:(url:string)=> axios.get(url).then(sleep(1000)).then(responceBody),
    post:(url:string, body:{})=>axios.post(url,body).then(sleep(1000)).then(responceBody),
    put:(url:string,body:{})=>axios.put(url,body).then(sleep(1000)).then(responceBody),
    del:(url:string)=> axios.delete(url).then(sleep(1000)).then(responceBody)
}

const Activities={
    list: ():Promise<IActivity[]>=>requests.get('/Activities'),
    details:(id:string)=> requests.get(`/Activities/${id}`),
    create:(activity:IActivity)=>requests.post('/Activities',activity),
    update:(activities:IActivity)=>requests.put(`/Activities/${activities.id}`,activities),
    delete:(id:string)=>requests.del(`/Activities/${id}`),
    attend:(id:string)=>requests.post(`/Activities/${id}/attend`,{}),
    unattend:(id:string)=>requests.del(`/Activities/${id}/attend`)
}

const User={
    current:():Promise<IUser>=>requests.get('/user'),
    login:(user:IUserFormValues):Promise<IUser>=> requests.post(`/user/login`,user),
    register:(user:IUserFormValues):Promise<IUser>=> requests.post(`/user/register`,user)


}
export default{
    Activities,
    User
}