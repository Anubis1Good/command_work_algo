import Menu from "../components/Menu/Menu"
import JButton from "../ui/JButton"
export default function () {
    return (
        <div className="container">
            <Menu />
            <div>
                <h1>mainPage</h1>
                <JButton clName='superbutton' title="ClickMe!" handle={() => alert('hello!')} />
                <JButton clName='normalbutton' title="ClickMe!" handle={() => alert('hello!')} />
                {/* <Counter initValue={0}/> */}

            </div>
        </div>
    )
}
