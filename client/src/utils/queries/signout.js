import Cookies from 'js-cookie';

export const signout = () => {
    localStorage.setItem("authenticated", "false");
    Cookies.remove("auth_token");
    Cookies.remove("user_id");
    fetch('/api/v1/logout',{method:"POST"});
}