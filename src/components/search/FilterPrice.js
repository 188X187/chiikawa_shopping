import { useContext, useState } from 'react';
import { DataContext } from '../../MainData';

export default function FilterPrice(props) {

    const { data, setData, category, setcategory, origin } = useContext(DataContext);

    return (
        <li>
            <label>
                <input
                    type='radio' name="price"
                    onChange={(e) => {
                        if (e.target.checked && props.startPrice && props.endPrice) {
                            const price = category.filter((item) =>
                                parseInt(props.startPrice, 10) <= parseInt(item.lprice, 10) &&
                                parseInt(item.lprice, 10) < parseInt(props.endPrice, 10) 
                                )
                            setData(price)
                        } else {
                            setData(category)
                        }
                    }
                    } />
                {props.title}
            </label>
        </li>
    )
}