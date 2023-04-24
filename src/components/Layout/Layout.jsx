import { useSetRecoilState } from "recoil";
import { menuModalState } from "@/atoms/menuModal";
import Footer from "../Footer/Footer"
import Navbar from "../Navbar/Navbar"

const Layout = ({ children }) => {
    const setMenuModalState = useSetRecoilState(menuModalState);

    const handleCloseMenuModal = () => {
        setMenuModalState({ open: false })
    }

    return (
        <>
            <Navbar />
            <main onClick={handleCloseMenuModal}>{children}</main>
            <Footer />
        </>
    )
}

export default Layout