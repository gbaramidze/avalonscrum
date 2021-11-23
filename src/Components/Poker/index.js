import React, {useState} from "react";
import Card from "../Card";
import style from "./style.module.css";
import {toast} from "react-toastify";

const numbers = ["0", "1", "2", "3", "5", "8", "13", "21", "☕", "❓"]

const Poker = ({status}) => {
	const [selected, setSelected] = useState(null);
	const handleSelect = (num) => {
		let message = `You voted for ${num}`
		if(selected) {
			message = `Vote changed to ${num}`
		}
		setSelected(num)
		toast.success(message, {
			position: "bottom-center",

		})
	}
	return (
		<div className={style.container}>
			{numbers.map(number => (
				<Card
					number={number}
					key={number}
					chosen={number === selected}
					onClick={handleSelect}
					clickable={status}
				/>
			))}
		</div>
	)
}

export default Poker