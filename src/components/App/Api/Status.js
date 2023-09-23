
import * as Request from "../Request";


const put = async (id, props = false, controller = false) => {
    return await Request.put(`car/${id}/status`, props, controller).then((result) => {
	    return result;
    });
};


export {
	put
}
