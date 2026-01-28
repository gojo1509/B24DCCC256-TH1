import React, { useEffect, useState } from 'react';
import { Card, InputNumber, Button, Typography, message, Space } from 'antd';

const { Text } = Typography;

const MAX_TURNS = 10;

const GuessNumberPage: React.FC = () => {
	// số ngẫu nhiên
	const [secret, setSecret] = useState<number>(0);

	// số người chơi nhập
	const [guess, setGuess] = useState<number | null>(null);

	// số lượt đã đoán
	const [turn, setTurn] = useState<number>(0);

	// trạng thái kết quả
	const [result, setResult] = useState<string>('');

	// sinh số khi bắt đầu game
	useEffect(() => {
		resetGame();
	}, []);

	function resetGame(){
		const random = Math.floor(Math.random() * 100) + 1;
		setSecret(random);
		setGuess(null);
		setTurn(0);
		setResult('');
	};

	const handleGuess = () => {
		if (guess === null) {
			message.warning('Vui lòng nhập số!');
			return;
		}

		const nextTurn = turn + 1;
		setTurn(nextTurn);

		if (guess === secret) {
			setResult('🎉 Chúc mừng! Bạn đã đoán đúng!');
			message.success('Đoán đúng!');
		} else if (guess < secret) {
			setResult('📉 Bạn đoán quá thấp!');
		} else {
			setResult('📈 Bạn đoán quá cao!');
		}

		if (nextTurn >= MAX_TURNS && guess !== secret) {
			setResult(`❌ Bạn đã hết lượt! Số đúng là ${secret}`);
		}
	};

	return (
		<Card title='🎯 Game Đoán Số (1–100)' style={{ maxWidth: 400 }}>
			<Space direction='vertical' style={{ width: '100%' }}>
				<Text>
					Lượt đoán: {turn}/{MAX_TURNS}
				</Text>

				<InputNumber
					min={1}
					max={100}
					value={guess}
					onChange={(value) => setGuess(value)}
					style={{ width: '100%' }}
					placeholder='Nhập số bạn đoán'
				/>

				<Button type='primary' onClick={handleGuess} disabled={turn >= MAX_TURNS || result.includes('đúng')}>
					Đoán
				</Button>

				{result && <Text>{result}</Text>}

				<Button onClick={resetGame}>Chơi lại</Button>
			</Space>
		</Card>
	);
};

export default GuessNumberPage;
