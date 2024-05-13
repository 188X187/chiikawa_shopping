import { useContext, useState } from "react";
import { DataContext } from "../../MainData";

export default function FilterPrice(props) {
const { data, setFilter } = useContext(DataContext);

return (
    <li>
    <label>
        <input
        type="radio"
        name="price"
        onChange={(e) => {
            if (props.categoryCheck === "") {
            props.setPriceCheck(props.title);
            const dataCopy = [...data];
            const update = dataCopy.filter((item) => {
                return (
                parseInt(props.startPrice) <= parseInt(item.lprice) &&
                parseInt(item.lprice) < parseInt(props.endPrice)
                );
            });
            setFilter(update);
            } else {
            props.setPriceCheck(props.title);
            const dataCopy = [...data];
            const update = dataCopy.filter((item) => {
                return (
                parseInt(props.startPrice) <= parseInt(item.lprice) &&
                parseInt(item.lprice) < parseInt(props.endPrice)
                );
            });
            const update2 = update.filter((item) => {
                return item.category3 == props.categoryCheck;
            });
            setFilter(update2);
            }
        }}
        />
        {props.title}
    </label>
    </li>
);
}
