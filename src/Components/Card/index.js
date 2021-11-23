import React, {memo} from "react";
import style from "./style.module.css"
const Card = ({number, chosen, onClick, clickable}) => {
	const callBack = () => {
		if(clickable && typeof onClick === "function") {
			onClick(number)
		}
	}
	return (
		<div
			className={`${style.card} ${!clickable ? style.disabled : ""} ${chosen ? style.chosen : ""}`}
			onClick={callBack}
		>
			{number}
		</div>
	)
}
export default memo(Card)