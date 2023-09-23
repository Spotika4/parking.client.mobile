
import * as Request from "../Request";


const get = async (id, props = false, controller = false) => {
    return await Request.get(`car/${id}/autoteca`, props, controller).then((result) => {
        return result;
    });
};


export {
    get
}
