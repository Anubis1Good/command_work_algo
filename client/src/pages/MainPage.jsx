import Counter from "../components/Counter"
import JButton from "../ui/JButton"
export default function () {
    return (
        <>
            <h1>mainPage</h1>
            <JButton clName='superbutton' title="ClickMe!" handle={()=>alert('hello!')}/>
            <JButton clName='normalbutton' title="ClickMe!" handle={()=>alert('hello!')}/>
            {/* <Counter initValue={0}/> */}
        </>
    )
}
