import axios from "axios";
import { URL } from "../../config";

const getAllUsers = async ()=>{

    try{        
        const route = `${URL}api/users`;
        const response = await axios.get(route);
        return response.data.data;
    }catch(e){
        throw e;
    }
}

export{
    getAllUsers
}