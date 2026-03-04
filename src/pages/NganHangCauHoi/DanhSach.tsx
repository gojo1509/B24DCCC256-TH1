import React, { useState } from 'react';
import { Table, Select } from 'antd';
import { cauHoiList, monHocList, khoiList } from '@/data-cau-hoi/questionBank';

const { Option } = Select;

const DanhSach: React.FC = () => {
	const [maMon, setMaMon] = useState<string>();
	const [mucDo, setMucDo] = useState<string>();

	const data = cauHoiList.filter((ch) => (!maMon || ch.maMon === maMon) && (!mucDo || ch.mucDo === mucDo));

	return (
		<div style={{ padding: 24 }}>
			<Select placeholder='Môn học' style={{ width: 200, marginRight: 10 }} onChange={setMaMon}>
				{monHocList.map((m) => (
					<Option key={m.maMon} value={m.maMon}>
						{m.tenMon}
					</Option>
				))}
			</Select>

			<Select placeholder='Mức độ' style={{ width: 200 }} onChange={setMucDo}>
				<Option value='DE'>Dễ</Option>
				<Option value='TRUNGBINH'>Trung bình</Option>
				<Option value='KHO'>Khó</Option>
				<Option value='RATKHO'>Rất khó</Option>
			</Select>

			<Table
				style={{ marginTop: 20 }}
				dataSource={data}
				rowKey='maCauHoi'
				columns={[
					{ title: 'Mã', dataIndex: 'maCauHoi' },
					{ title: 'Nội dung', dataIndex: 'noiDung' },
					{ title: 'Mức độ', dataIndex: 'mucDo' },
				]}
			/>
		</div>
	);
};

export default DanhSach;
