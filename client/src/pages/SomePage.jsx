import { useEffect } from "react"

export default function () {
    useEffect(()=>{
        fetch('/api/v1/test')
        .then(res => res.text())
        .then(text=> {
            console.log(text)})
    },[])
    return (
        <>
        <h1>Test Page1</h1>
        </>
    )
}