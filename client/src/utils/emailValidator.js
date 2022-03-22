
const emailValidator = (email) => {
    // params -> email: string
    // Checks email's format
    // Returns -> boolean
    const re = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    if(re.test(email)) {
        return true
    }
    return false
}

export default emailValidator