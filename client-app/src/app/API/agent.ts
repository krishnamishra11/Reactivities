import axios, { AxiosResponse } from 'axios';
import {IActivity} from '../../model/IActivity';
axios.defaults.baseURL='http://localhost:5000/';
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
    delete:(id:string)=>requests.del(`/Activities/${id}`)
}

export default{
    Activities
}