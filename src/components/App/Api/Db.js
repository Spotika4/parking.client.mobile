import * as Storage from "../Storage";
import * as Request from "../Request";


const get = async (props) => {
    return await Request.get(`db`).then((result) => {
        if(result.success === true){
            Object.keys(result.data).forEach((key) => {
                Storage.save(key.toUpperCase(), result.data[key]);
            });
        }

        return result;
    });
};

export {
    get
}