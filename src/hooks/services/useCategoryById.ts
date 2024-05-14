import axios from "axios";

export default function useCategoryById(id: string) {

    axios.get(`/api/category/${id}`).then(data => {

        console.log("data", data);
        return data;
    })

}
