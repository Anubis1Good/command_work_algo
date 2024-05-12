import { AuthProvider } from "../components/AuthProvider";
import Header from "../components/Header/Header";

export default function ({children}) {
    return (
        <AuthProvider>
            <Header/>
            {children}
        </AuthProvider>
    );
}