import React, { useEffect, useMemo, useState } from "react";

export const App: React.FC = () => {
	const [wsCurrent, setWsCurrent] = useState("ws://localhost:3001");
	const [inputValue, setInputValue] = useState("");
	const [message, setMessage] = useState<string[]>([]);

	useEffect(() => {
		const socket = new WebSocket(wsCurrent);

		socket.addEventListener("open", () => {
			socket.send("Mensagem do cliente: Olá, servidor!");
			setMessage((prev) => [...prev, `${wsCurrent}: Conexão estabelecida com o servidor`]);
		});

		socket.addEventListener("message", (event) => {
			setMessage((prev) => [...prev, `${wsCurrent}: Mensagem do servidor: ${event.data}`]);
		});

		socket.addEventListener("close", () => {
			setMessage((prev) => [...prev, `${wsCurrent}:"Conexão fechada`]);
		});

		return () => {
			socket.close();
		};
	}, [wsCurrent]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	const handleSubmit = () => {
		setWsCurrent(inputValue); // Atualiza wsCurrent com o valor do input
		console.log("Novo valor do WebSocket:", wsCurrent);
	};

	return (
		<div className="h-screen">
			<div className="border flex flex-col gap-3 border-gray-700 rounded-md m-1 p-10  bg-zinc-900">
				<label className="flex text-white gap-2">
					Current Connection Websocket from:
					<span className="text-orange-600">{wsCurrent}</span>
				</label>
				<div className="flex border border-orange-600 rounded-md">
					<input className="w-full p-2 rounded-l-md" placeholder="Route new WebSocket" value={inputValue} onChange={handleInputChange} />
					<button
						className="font-normal text-white w-full rounded-r-md bg-gradient-to-t from-orange-600 to-red-600 p-2"
						onClick={handleSubmit}
					>
						Add Connection
					</button>
				</div>
			</div>
			<div className="border border-gray-700  rounded-md m-1 p-2 flex flex-col ">
				{message.map((items) => (
					<div className="hover:bg-orange-300">{items}</div>
				))}
			</div>
		</div>
	);
};
