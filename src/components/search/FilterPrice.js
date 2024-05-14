import { useContext, useState } from "react";
import { DataContext } from "../../MainData";
import { ButtonGroup, ToggleButton, ToggleButtonGroup } from "react-bootstrap";

export default function FilterPrice(props) {
    const { data, setFilter } = useContext(DataContext);

    const [selectedButton, setSelectedButton] = useState(null);

    const handleButtonClick = (value) => {
        // 클릭된 버튼이 현재 선택된 값이 아니라면 선택한 값을 변경합니다.
        if (selectedButton !== value) {
            setSelectedButton(value);

        } else {
            // 이미 선택된 버튼을 다시 클릭했을 때는 선택을 해제합니다.
            setSelectedButton(null);

        }
        // 여기에 필요한 로직을 추가할 수 있습니다. (선택된 값에 따른 처리 등)
    };

    return (
        <li>
            <ButtonGroup>
                <ToggleButtonGroup type="radio" name="price">
                    <ToggleButton
                        variant={selectedButton === props.title ? "success" : "outline-success"}
                        onClick={() => {
                            handleButtonClick(props.title);
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
                    >
                        {props.title}원
                    </ToggleButton>
                </ToggleButtonGroup>


            </ButtonGroup>
        </li>
    );
}
