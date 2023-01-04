import * as Storage from "../Storage";
import * as Request from "../Request";


const current = () => {
    return Storage.get('USER');
};

const get = async (props) => {
    return await Request.get(`user/${props.id}`, {
        URL: `user/${props.id}`,
    }).then((result) => {
        if(result.success === true){

        }

        return result;
    });
};

const login = async (props) => {
    return await Request.post(`token`, {
        LOGIN: props.LOGIN,
        PASSWORD: props.PASSWORD,
        UF_PUSH_TOKEN: false
    }).then((result) => {
        if(result.success === true){
            Storage.save('USER', result.data);
            Storage.save('USER_ID', result.data?.ID);
            Storage.save('UF_TOKEN', result.data?.UF_TOKEN);
        }

        return result;
    });
};

const logout = async () => {

    return await Request.del(`token`, {}).then((result) => {
        if(result.success === true){
            localStorage.clear();
        }

        return result;
    });
};

export {
    current, get, login, logout
}