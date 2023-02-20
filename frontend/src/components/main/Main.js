import Header from "../header/Header";
import Footer from "../footer/Footer";
import Item from "../item/Item";


function Main(item) {
    return (
        <div className="main">
            <Header />
            <div className="main_wrapper">
                <div className="main_items">
                    <Item />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Main;