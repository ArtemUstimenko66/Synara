import api from "./api";

export const sendEmailVerification = async (email: string) => {
    return api.post("/confirmation-email/send-confirmation-link", {email})
        .then((value) => {
            console.log(value)
        })
        .catch((error)=>{
            console.log(error.response.data.message)
        })
}