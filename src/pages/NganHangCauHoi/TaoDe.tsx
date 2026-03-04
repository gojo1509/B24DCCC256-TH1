import React, { useState, useMemo } from 'react';
import { Select, InputNumber, Button, List, Card, message, Typography, Space, Tag, Table } from 'antd';
import {
	monHocList,
	khoiList,
	cauHoiList,
	deThiList,
	CauTrucChiTiet,
	DeThi,
	MucDo,
	CauHoi,
} from '@/data-cau-hoi/questionBank';

const { Option } = Select;
const { Title, Text } = Typography;

const TaoDe: React.FC = () => {
	// State cho form nhập
	const [maMon, setMaMon] = useState<string>();
	const [maKhoi, setMaKhoi] = useState<string>();
	const [mucDo, setMucDo] = useState<MucDo>();
	const [soLuong, setSoLuong] = useState<number>(1);

	// State lưu trữ dữ liệu đang tạo
	const [cauTrucTam, setCauTrucTam] = useState<CauTrucChiTiet[]>([]);
	const [deHienTai, setDeHienTai] = useState<DeThi | null>(null);

	// Lọc danh sách khối kiến thức dựa trên môn đã chọn
	const filteredKhoiList = useMemo(() => {
		return khoiList.filter((k) => k.maMon === maMon);
	}, [maMon]);

	// Thêm một dòng cấu trúc vào danh sách tạm
	const themCauTruc = () => {
		if (!maMon || !maKhoi || !mucDo) {
			message.warning('Vui lòng chọn đầy đủ Môn, Khối và Mức độ');
			return;
		}

		const moi: CauTrucChiTiet = { maKhoi, mucDo, soLuong };
		setCauTrucTam([...cauTrucTam, moi]);
		message.info('Đã thêm vào cấu trúc dự kiến');
	};

	// Logic tạo đề thi thực tế
	const taoDeThi = () => {
		if (!maMon || cauTrucTam.length === 0) {
			message.error('Cần chọn môn và thiết lập ít nhất 1 cấu trúc');
			return;
		}

		let ketQuaCauHoi: CauHoi[] = [];

		for (const ct of cauTrucTam) {
			// Tìm câu hỏi thỏa mãn: đúng môn, đúng khối, đúng mức độ
			const pool = cauHoiList.filter((ch) => ch.maMon === maMon && ch.maKhoi === ct.maKhoi && ch.mucDo === ct.mucDo);

			if (pool.length < ct.soLuong) {
				const tenKhoi = khoiList.find((k) => k.maKhoi === ct.maKhoi)?.tenKhoi;
				message.error(`Không đủ câu hỏi! Khoá [${tenKhoi}] mức [${ct.mucDo}] chỉ có ${pool.length} câu.`);
				return;
			}

			// Shuffle (trộn) và lấy số lượng yêu cầu
			const randomSelected = [...pool].sort(() => Math.random() - 0.5).slice(0, ct.soLuong);

			ketQuaCauHoi = [...ketQuaCauHoi, ...randomSelected];
		}

		const deMoi: DeThi = {
			maDe: `DE_${maMon}_${Date.now().toString().slice(-4)}`,
			maMon,
			danhSachCauHoi: ketQuaCauHoi,
		};

		deThiList.push(deMoi);
		setDeHienTai(deMoi);
		setCauTrucTam([]); // Reset cấu trúc sau khi tạo thành công
		message.success('Tạo đề thi thành công!');
	};

	return (
		<div style={{ padding: 24, maxWidth: 1000, margin: '0 auto' }}>
			<Title level={2}>Hệ thống tạo đề thi</Title>

			<Card title='Cấu hình đề thi' style={{ marginBottom: 20 }}>
				<Space direction='vertical' style={{ width: '100%' }} size='middle'>
					{/* Bước 1: Chọn môn */}
					<div>
						<Text strong>1. Chọn môn học: </Text>
						<Select
							placeholder='Chọn môn'
							style={{ width: 250 }}
							onChange={(val) => {
								setMaMon(val);
								setMaKhoi(undefined);
								setCauTrucTam([]);
							}}
						>
							{monHocList.map((m) => (
								<Option key={m.maMon} value={m.maMon}>
									{m.tenMon}
								</Option>
							))}
						</Select>
					</div>

					{/* Bước 2: Thiết lập chi tiết */}
					<Space wrap>
						<Text strong>2. Thiết lập chi tiết: </Text>
						<Select
							placeholder='Khối kiến thức'
							style={{ width: 200 }}
							value={maKhoi}
							onChange={setMaKhoi}
							disabled={!maMon}
						>
							{filteredKhoiList.map((k) => (
								<Option key={k.maKhoi} value={k.maKhoi}>
									{k.tenKhoi}
								</Option>
							))}
						</Select>

						<Select placeholder='Mức độ' style={{ width: 130 }} value={mucDo} onChange={setMucDo}>
							<Option value='DE'>Dễ</Option>
							<Option value='TRUNGBINH'>Trung bình</Option>
							<Option value='KHO'>Khó</Option>
							<Option value='RATKHO'>Rất khó</Option>
						</Select>

						<InputNumber min={1} value={soLuong} onChange={(v) => setSoLuong(v || 1)} />

						<Button type='dashed' onClick={themCauTruc} disabled={!maKhoi}>
							Thêm vào cấu trúc
						</Button>
					</Space>
				</Space>
			</Card>

			{/* Bảng hiển thị cấu trúc đang soạn */}
			{cauTrucTam.length > 0 && (
				<Card title='Cấu trúc đề dự kiến' style={{ marginBottom: 20 }}>
					<Table
						dataSource={cauTrucTam}
						pagination={false}
						size='small'
						rowKey={(record) => record.maKhoi + record.mucDo}
						columns={[
							{ title: 'Khối', dataIndex: 'maKhoi', key: 'maKhoi' },
							{ title: 'Mức độ', dataIndex: 'mucDo', key: 'mucDo', render: (text) => <Tag color='blue'>{text}</Tag> },
							{ title: 'Số lượng', dataIndex: 'soLuong', key: 'soLuong' },
						]}
					/>
					<Button type='primary' block size='large' onClick={taoDeThi} style={{ marginTop: 15 }}>
						Bắt đầu tạo đề
					</Button>
				</Card>
			)}

			{/* Kết quả sau khi tạo */}
			{deHienTai && (
				<Card title={<Title level={4}>Kết quả: {deHienTai.maDe}</Title>} style={{ borderColor: '#1890ff' }}>
					<List
						itemLayout='horizontal'
						dataSource={deHienTai.danhSachCauHoi}
						renderItem={(item, index) => (
							<List.Item>
								<List.Item.Meta
									title={
										<Text strong>
											Câu {index + 1} <Tag color='orange'>{item.mucDo}</Tag>
										</Text>
									}
									description={item.noiDung}
								/>
								<div>{item.maKhoi}</div>
							</List.Item>
						)}
					/>
				</Card>
			)}
		</div>
	);
};

export default TaoDe;
