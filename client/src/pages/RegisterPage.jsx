
export default function () {
    return (
        <>
        <h1>RegisterPage</h1>

        <form action="http://localhost:3000/api/v1/register" method="post">
            <label htmlFor="username"> Username</label>
            <input type="text" name="name" id="name" />

            <label htmlFor="password"> Password</label>
            <input type="password" name="password" id="password" />

            <input type="submit" value="Register" />
        </form>
        </>
    )

}