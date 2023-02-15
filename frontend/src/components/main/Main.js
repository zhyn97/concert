import Header from "../header/Header";
import Footer from "../footer/Footer";
import Item from "../item/Item";


function Main(item) {
    return (
        <div className="main">
            <Header />
            <Item />
            <Footer />
        </div>
    )
}

export default Main;