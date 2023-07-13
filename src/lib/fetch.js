import axios from "axios";

export const GetImages = async (page) => {
    let config = {
        method: "get",
        url: `https://api.unsplash.com/photos?page=${page}&client_id=sbVKKcD1AiYaaUe-09gwcro4_6VxWW9QOgLXlrCb9CI`,
        headers: {
            "Content-Type": "application/json",
        },
    };
    const response = await axios(config);
    return response.data;
};