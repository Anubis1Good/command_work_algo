import React ,{useEffect, useRef} from 'react'
import styles from './Sidebar.module.css'

export default function Sidebar({ children, isOpen, setOpen }) {
    const ref = useRef(null)
    useEffect(() => {
        if (isOpen) {
            ref.current.showModal()
        }
        else {
            ref.current.close()
        }
    }, [isOpen])

    return (
        <dialog ref ={ref} onMouseDown={(e) => {e.target === ref.current && setOpen(false)}} className={isOpen ? styles.open : styles.closed}>
            {children}
        </dialog>
    )
}

