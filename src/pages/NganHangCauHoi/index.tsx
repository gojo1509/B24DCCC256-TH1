import React, { useState } from 'react';
import { Card, Select, InputNumber, Button, message, List, Typography } from 'antd';
import { monHocList, khoiList, cauHoiList, deThiList, CauTrucChiTiet } from '@/data-cau-hoi/questionBank';

const { Title } = Typography;
const { Option } = Select;

const IndexPage: React.FC = () => {
	const [maMon, setMaMon] = useState<string>();
	const [maKhoi, setMaKhoi] = useState<string>();
	const [mucDo, setMucDo] = useState<any>();
	const [soLuong, setSoLuong] = useState<number>(1);
	const [cauTruc, setCauTruc] = useState<CauTrucChiTiet[]>([]);
	const [deDaTao, setDeDaTao] = useState<any[]>([]);

	const themCauTruc = () => {
		if (!maKhoi || !mucDo || !soLuong) {
			message.error('Chưa nhập đủ thông tin');
			return;
		}

		setCauTruc([...cauTruc, { maKhoi, mucDo, soLuong }]);
	};

	const taoDe = () => {
		if (!maMon) {
			message.error('Chọn môn học');
			return;
		}

		const danhSach: any[] = [];

		for (const ct of cauTruc) {
			const loc = cauHoiList.filter((ch) => ch.maMon === maMon && ch.maKhoi === ct.maKhoi && ch.mucDo === ct.mucDo);

			if (loc.length < ct.soLuong) {
				message.error('Không đủ câu hỏi');
				return;
			}

			const random = loc.sort(() => 0.5 - Math.random()).slice(0, ct.soLuong);
			danhSach.push(...random);
		}

		const de = {
			maDe: 'DE' + (deThiList.length + 1),
			maMon,
			danhSachCauHoi: danhSach,
		};

		deThiList.push(de);
		setDeDaTao([...deDaTao, de]);

		message.success('Tạo đề thành công');
	};

	return (
		<div style={{ padding: 24 }}>
			<Title level={3}>Tạo đề thi</Title>

			<Card style={{ marginBottom: 20 }}>
				<Select placeholder='Chọn môn' style={{ width: 200 }} onChange={setMaMon}>
					{monHocList.map((m) => (
						<Option key={m.maMon} value={m.maMon}>
							{m.tenMon}
						</Option>
					))}
				</Select>
			</Card>

			<Card style={{ marginBottom: 20 }}>
				<Select placeholder='Khối' style={{ width: 150, marginRight: 10 }} onChange={setMaKhoi}>
					{khoiList
						.filter((k) => k.maMon === maMon)
						.map((k) => (
							<Option key={k.maKhoi} value={k.maKhoi}>
								{k.tenKhoi}
							</Option>
						))}
				</Select>

				<Select placeholder='Mức độ' style={{ width: 150, marginRight: 10 }} onChange={setMucDo}>
					<Option value='DE'>Dễ</Option>
					<Option value='TRUNGBINH'>Trung bình</Option>
					<Option value='KHO'>Khó</Option>
					<Option value='RATKHO'>Rất khó</Option>
				</Select>

				<InputNumber min={1} value={soLuong} onChange={(v) => setSoLuong(v || 1)} />

				<Button type='primary' onClick={themCauTruc} style={{ marginLeft: 10 }}>
					Thêm cấu trúc
				</Button>
			</Card>

			<Button type='primary' onClick={taoDe}>
				Tạo đề thi
			</Button>

			<List
				header='Danh sách đề đã tạo'
				bordered
				dataSource={deDaTao}
				renderItem={(item) => (
					<List.Item>
						{item.maDe} - {item.danhSachCauHoi.length} câu
					</List.Item>
				)}
				style={{ marginTop: 20 }}
			/>
		</div>
	);
};

export default IndexPage;
