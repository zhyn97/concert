import { useState, React } from "react";
import { useNavigate } from 'react-router-dom';
import AdminItem from "../adminItem/AdminItem.js";
import Modal from "../modal/Modal.js";
import api from '../../utilities/api';

function Admin() {
    const [isModal, setModal] = useState(false);
    const [items, setItems] = useState([]);
    const [data, setData] = useState({
        _id: "",
        city: "",
        club: "",
        date: "",
        link: ""
    });
    const [newItem, setNewItem] = useState({
        city: "",
        club: "",
        date: "",
        link: ""
    });
    const navigate = useNavigate();

    function checkToken() {
        const token = localStorage.getItem('token');
        if(token){
            return token;
        } else {
            throw new Error("Invalid token");
        }
    }

    function signOut() {
        localStorage.removeItem('token');
        navigate('/login');
    }

    function onModal(e) {
        const item = items.find(item => item._id === e.target.parentElement.parentElement.id);
        setData(prevState => {
            return { ...prevState, ...item };
        })
        setModal(true);
    }

    function onChangeData(e) {
        setData(prevState => {
            return { ...prevState, ...{ [e.target.name]: e.target.value } };
        })
    }

    function onChangeNewItem(e) {
        setNewItem(prevState => {
            return { ...prevState, ...{ [e.target.name]: e.target.value } };
        })
    }

    function onClose() {
        setModal(false)
    }


    function upDate(e) {
        e.preventDefault();
        const token = checkToken();
        api.upDate(token, data)
            .then(res => {
                const item = items.map((item) => (
                    item._id === res._id
                        ? { ...item, ...res }
                        : item
                ));
                setItems(item);
                onClose();
            })
            .catch(error => console.log(error));
    }

    function deleteCard(e) {
        e.preventDefault();
        const token = checkToken();
        const id = e.target.parentElement.parentElement.id
        api.delete(id, token)
            .then(res => {
                const item = items.filter(item => item._id !== id);
                setItems(item);
                onClose();
            })
            .catch(error => console.log(error));
    }

    function addCard(e) {
        e.preventDefault();
        const token = checkToken();
        api.addCard(token, newItem)
            .then(res => {
                const newItems = [...items, res];
                setItems(newItems);
                setNewItem({
                    city: "",
                    club: "",
                    date: "",
                    link: ""
                })
                onClose();
            })
            .catch(error => console.log(error));
    }

    return (
        <div className="admin">
            <button className="admin_button" onClick={signOut}>Exit</button>
            <AdminItem deleteCard={deleteCard} onModal={onModal} items={items} setItems={setItems} />
            <Modal
                isVisible={isModal}
                title="Updating information about the event"
                content={
                    <form className="form-modal">
                        <input className="form-modal_input" type="text" name="city" value={data.city} onChange={onChangeData} />
                        <input className="form-modal_input" type="text" name="club" value={data.club} onChange={onChangeData} />
                        <input className="form-modal_input" type="text" name="date" value={data.date} onChange={onChangeData} />
                        <input className="form-modal_input" type="text" name="link" value={data.link} onChange={onChangeData} />
                    </form>
                }
                footer={<button className="form-modal_button" onClick={upDate} >Send</button>}
                onClose={onClose}
            />
            <form className="form">
                <p className="form_header">Add a new event</p>
                <input className="form_input" type="text" name="city" value={newItem.city} onChange={onChangeNewItem} />
                <input className="form_input" type="text" name="club" value={newItem.club} onChange={onChangeNewItem} />
                <input className="form_input" type="text" name="date" value={newItem.date} onChange={onChangeNewItem} />
                <input className="form_input" type="text" name="link" value={newItem.link} onChange={onChangeNewItem} />
                <button className="form_button" onClick={addCard}>Send</button>
            </form>
        </div>
    )
}

export default Admin;