import React, { useState } from 'react';
import { Card, Button, Typography, message, Space, Divider, List } from 'antd';

const { Text, Title } = Typography;

const choices = ['✊', '✋', '✌️'];

interface HistoryItem {
	round: number;
	player: string;
	computer: string;
	result: string;
}

const OanTuTiPage: React.FC = () => {
	const [playerChoice, setPlayerChoice] = useState<string>('');
	const [computerChoice, setComputerChoice] = useState<string>('');
	const [result, setResult] = useState<string>('');
	const [playerScore, setPlayerScore] = useState<number>(0);
	const [computerScore, setComputerScore] = useState<number>(0);
	const [loading, setLoading] = useState<boolean>(false);
	const [history, setHistory] = useState<HistoryItem[]>([]);
	const [round, setRound] = useState<number>(0);

	const playGame = (choice: string) => {
		if (loading) return;

		setPlayerChoice(choice);
		setComputerChoice('');
		setResult('');
		setLoading(true);

		setTimeout(() => {
			const randomIndex = Math.floor(Math.random() * choices.length);
			const computerMove = choices[randomIndex];
			setComputerChoice(computerMove);

			let gameResult = '';

			if (choice === computerMove) {
				gameResult = 'Hòa';
				message.info('Hòa rồi ');
			} else if (
				(choice === '✊' && computerMove === '✌️') ||
				(choice === '✋' && computerMove === '✊') ||
				(choice === '✌️' && computerMove === '✋')
			) {
				gameResult = 'Thắng';
				setPlayerScore((prev) => prev + 1);
				message.success('Bạn thắng ');
			} else {
				gameResult = 'Thua';
				setComputerScore((prev) => prev + 1);
				message.error('Bạn thua ');
			}

			const newRound = round + 1;
			setRound(newRound);

			// Thêm vào lịch sử
			setHistory((prev) => [
				{
					round: newRound,
					player: choice,
					computer: computerMove,
					result: gameResult,
				},
				...prev,
			]);

			setResult(gameResult);
			setLoading(false);
		}, 800);
	};

	const resetGame = () => {
		setPlayerChoice('');
		setComputerChoice('');
		setResult('');
		setPlayerScore(0);
		setComputerScore(0);
		setHistory([]);
		setRound(0);
		message.warning('Đã reset toàn bộ lịch sử!');
	};

	const getResultColor = (res: string) => {
		if (res === 'Thắng') return '#52c41a';
		if (res === 'Thua') return '#ff4d4f';
		return '#faad14';
	};

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				minHeight: '100vh',
				background: 'linear-gradient(135deg, #f0f5ff, #ffffff)',
			}}
		>
			<Card
				style={{
					width: 520,
					borderRadius: 20,
					boxShadow: '0 15px 40px rgba(0,0,0,0.08)',
					textAlign: 'center',
				}}
			>
				<Title level={3}>🎮 Game Oẳn Tù Tì</Title>

				{/* Nút chọn */}
				<Space size='large'>
					{choices.map((choice) => (
						<Button
							key={choice}
							onClick={() => playGame(choice)}
							disabled={loading}
							style={{
								fontSize: 28,
								width: 80,
								height: 80,
								borderRadius: 16,
							}}
						>
							{choice}
						</Button>
					))}
				</Space>

				<Divider />

				{/* Kết quả hiện tại */}
				{playerChoice && <Text> Bạn: {playerChoice}</Text>}
				<br />
				{computerChoice && <Text> Máy: {computerChoice}</Text>}
				<br />
				{result && (
					<Title level={4} style={{ color: getResultColor(result) }}>
						{result}
					</Title>
				)}

				<Divider />

				{/* Điểm số */}
				<div
					style={{
						background: '#fafafa',
						padding: 15,
						borderRadius: 12,
					}}
				>
					<Text strong> Điểm số</Text>
					<br />
					<Text style={{ fontSize: 18, fontWeight: 600 }}>Bạn: {playerScore}</Text>
					<br />
					<Text style={{ fontSize: 18, fontWeight: 600 }}>Máy: {computerScore}</Text>
				</div>

				<Divider />

				{/* Lịch sử */}
				<Title level={5}> Lịch sử ván chơi</Title>

				<List
					bordered
					dataSource={history}
					locale={{ emptyText: 'Chưa có ván nào' }}
					style={{ maxHeight: 200, overflowY: 'auto', marginBottom: 10 }}
					renderItem={(item) => (
						<List.Item>
							<Text>
								Ván {item.round}: Bạn {item.player} - Máy {item.computer} -{' '}
								<span style={{ color: getResultColor(item.result) }}>{item.result}</span>
							</Text>
						</List.Item>
					)}
				/>

				<Button danger onClick={resetGame}>
					Reset toàn bộ
				</Button>
			</Card>
		</div>
	);
};

export default OanTuTiPage;
