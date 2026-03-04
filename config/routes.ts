import path from 'path';

export default [
	{
		path: '/user',
		layout: false,
		routes: [
			{
				path: '/user/login',
				layout: false,
				name: 'login',
				component: './user/Login',
			},
			{
				path: '/user',
				redirect: '/user/login',
			},
		],
	},

	///////////////////////////////////
	// DEFAULT MENU
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: './TrangChu',
		icon: 'HomeOutlined',
	},
	{
		path: '/gioi-thieu',
		name: 'About',
		component: './TienIch/GioiThieu',
		hideInMenu: true,
	},
	{
		path: '/random-user',
		name: 'RandomUser',
		component: './RandomUser',
		icon: 'ArrowsAltOutlined',
	},
	{
		path: '/guess-number',
		name: 'Đoán Số',
		component: './GuessNumber',
	},
	{
		path: '/oan-tu-ti',
		name: 'Oẳn Tù Tì',
		component: './OanTuTi',
	},
	{
		path: '/todo-list',
		name: 'Todo List',
		component: './ToDoList',
	},
	{
		path: '/ngan-hang-cau-hoi',
		name: 'Ngân Hàng Câu Hỏi',
		icon: 'BookOutlined',
		routes: [
			{
				path: '/ngan-hang-cau-hoi',
				component: './NganHangCauHoi/index',
				hideInMenu: true, // ẩn trang cha nếu chỉ làm trang giới thiệu
			},
			{
				path: '/ngan-hang-cau-hoi/danh-sach',
				name: 'Danh sách câu hỏi',
				component: './NganHangCauHoi/DanhSach',
			},
			{
				path: '/ngan-hang-cau-hoi/them',
				name: 'Thêm câu hỏi',
				component: './NganHangCauHoi/Them',
			},
			{
				path: '/ngan-hang-cau-hoi/tao-de',
				name: 'Tạo đề thi',
				component: './NganHangCauHoi/TaoDe',
			},
		],
	},

	// DANH MUC HE THONG
	// {
	// 	name: 'DanhMuc',
	// 	path: '/danh-muc',
	// 	icon: 'copy',
	// 	routes: [
	// 		{
	// 			name: 'ChucVu',
	// 			path: 'chuc-vu',
	// 			component: './DanhMuc/ChucVu',
	// 		},
	// 	],
	// },

	{
		path: '/notification',
		routes: [
			{
				path: './subscribe',
				exact: true,
				component: './ThongBao/Subscribe',
			},
			{
				path: './check',
				exact: true,
				component: './ThongBao/Check',
			},
			{
				path: './',
				exact: true,
				component: './ThongBao/NotifOneSignal',
			},
		],
		layout: false,
		hideInMenu: true,
	},
	{
		path: '/',
	},
	{
		path: '/403',
		component: './exception/403/403Page',
		layout: false,
	},
	{
		path: '/hold-on',
		component: './exception/DangCapNhat',
		layout: false,
	},
	{
		component: './exception/404',
	},
];
