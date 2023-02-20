import { useEffect, useState } from "react";
import { BASE_URL } from '../../utilities/constant';

function Item({ deleteCard, onModal, items, setItems }) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        fetch(`${BASE_URL}/api/cards`)
            .then((res) => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
    }, []);

    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Загрузка...</div>;
    } else {
        return items.map((item) => {
            return (
                <div key={item._id} id={item._id} className="adminItem">
                    <div className="adminItem_info">
                        <p className="adminItem_text">City: {item.city}</p>
                        <p className="adminItem_text">Club: {item.club}</p>
                        <p className="adminItem_text">Date: {item.date}</p>
                        <p className="adminItem_text">Link: {item.link}</p>
                    </div>
                    <div className="adminItem_control">
                        <button className="adminItem_button" onClick={onModal}>Update</button>
                        <button className="adminItem_button" onClick={deleteCard}>Delete</button>
                    </div>
                </div>
            );
        });
    }
}

export default Item;
