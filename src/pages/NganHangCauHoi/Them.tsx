import React from 'react';
import { Form, Input, Select, Button, message } from 'antd';
import { cauHoiList, monHocList, khoiList } from '@/data-cau-hoi/questionBank';

const { Option } = Select;

const Them: React.FC = () => {
	const onFinish = (values: any) => {
		cauHoiList.push(values);
		message.success('Đã thêm câu hỏi');
	};

	return (
		<div style={{ padding: 24, maxWidth: 500 }}>
			<Form layout='vertical' onFinish={onFinish}>
				<Form.Item name='maCauHoi' label='Mã câu hỏi' required>
					<Input />
				</Form.Item>

				<Form.Item name='maMon' label='Môn học' required>
					<Select>
						{monHocList.map((m) => (
							<Option key={m.maMon} value={m.maMon}>
								{m.tenMon}
							</Option>
						))}
					</Select>
				</Form.Item>

				<Form.Item name='maKhoi' label='Khối kiến thức' required>
					<Select>
						{khoiList.map((k) => (
							<Option key={k.maKhoi} value={k.maKhoi}>
								{k.tenKhoi}
							</Option>
						))}
					</Select>
				</Form.Item>

				<Form.Item name='mucDo' label='Mức độ' required>
					<Select>
						<Option value='DE'>Dễ</Option>
						<Option value='TRUNGBINH'>Trung bình</Option>
						<Option value='KHO'>Khó</Option>
						<Option value='RATKHO'>Rất khó</Option>
					</Select>
				</Form.Item>

				<Form.Item name='noiDung' label='Nội dung' required>
					<Input.TextArea rows={4} />
				</Form.Item>

				<Button type='primary' htmlType='submit'>
					Thêm
				</Button>
			</Form>
		</div>
	);
};

export default Them;
