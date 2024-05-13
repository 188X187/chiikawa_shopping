import { useContext, useState } from 'react';
import { DataContext } from '../../MainData';

export default function FilterPrice(props) {

    const { filter, data, setData, setParams } = useContext(DataContext);

    return (
        <li>

            <label>
                <input
                    type='radio' name="price"
                    onChange={(e) => {
                        if (e.target.checked && props.startPrice && props.endPrice) {
                            const price = filter.filter((item) =>
                                parseInt(props.startPrice, 10) <= parseInt(item.lprice, 10) &&
                                parseInt(item.lprice, 10) < parseInt(props.endPrice, 10))
                            setData(price)
                        } else {
                            setData(filter)
                        }
                    }
                    } />
                {props.title}
            </label>
        </li>
    )
}