import { useEffect, useState } from "react";
import { BASE_URL } from '../../utilities/constant';

function Item() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

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
        <div key={item._id} className="item">
          <div className="item_info">
            <h2 className="item_info-city">{item.city}</h2>
            <p className="item_info-club">{item.club}</p>
            <button className="item_info-button">BUY</button>
          </div>
          <p className="item_date">{item.date}</p>
        </div>
      );
    });
  }
}

export default Item;
