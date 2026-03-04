// ====== TYPE ======

export type MucDo = 'DE' | 'TRUNGBINH' | 'KHO' | 'RATKHO';

export interface MonHoc {
	maMon: string;
	tenMon: string;
	soTinChi: number;
}

export interface KhoiKienThuc {
	maKhoi: string;
	tenKhoi: string;
	maMon: string;
}

export interface CauHoi {
	maCauHoi: string;
	maMon: string;
	maKhoi: string;
	mucDo: MucDo;
	noiDung: string;
}

export interface CauTrucChiTiet {
	maKhoi: string;
	mucDo: MucDo;
	soLuong: number;
}

export interface CauTrucDe {
	maCauTruc: string;
	tenCauTruc: string;
	maMon: string;
	chiTiet: CauTrucChiTiet[];
}

export interface DeThi {
	maDe: string;
	maMon: string;
	danhSachCauHoi: CauHoi[];
}

// ====== DATA ======

export const monHocList: MonHoc[] = [
	{ maMon: 'CSDL', tenMon: 'Cơ sở dữ liệu', soTinChi: 3 },
	{ maMon: 'WEB', tenMon: 'Lập trình Web', soTinChi: 3 },
	{ maMon: 'JAVA', tenMon: 'Lập trình Java', soTinChi: 4 },
];

export const khoiList: KhoiKienThuc[] = [
	// Môn Cơ sở dữ liệu
	{ maKhoi: 'TONGQUAN', tenKhoi: 'Tổng quan CSDL', maMon: 'CSDL' },
	{ maKhoi: 'CHUANHOA', tenKhoi: 'Chuẩn hóa dữ liệu', maMon: 'CSDL' },
	{ maKhoi: 'SQL', tenKhoi: 'Ngôn ngữ SQL', maMon: 'CSDL' },
	// Môn Lập trình Web
	{ maKhoi: 'HTML_CSS', tenKhoi: 'HTML & CSS cơ bản', maMon: 'WEB' },
	{ maKhoi: 'JAVASCRIPT', tenKhoi: 'Javascript ES6', maMon: 'WEB' },
	{ maKhoi: 'REACT', tenKhoi: 'ReactJS Framework', maMon: 'WEB' },
];

export const cauHoiList: CauHoi[] = [
	// --- MÔN CSDL ---
	// Khối: Tổng quan
	{ maCauHoi: 'CH_CSDL_01', maMon: 'CSDL', maKhoi: 'TONGQUAN', mucDo: 'DE', noiDung: 'Hệ quản trị CSDL là gì?' },
	{
		maCauHoi: 'CH_CSDL_02',
		maMon: 'CSDL',
		maKhoi: 'TONGQUAN',
		mucDo: 'DE',
		noiDung: 'Liệt kê các đối tượng chính trong CSDL quan hệ.',
	},
	{
		maCauHoi: 'CH_CSDL_03',
		maMon: 'CSDL',
		maKhoi: 'TONGQUAN',
		mucDo: 'TRUNGBINH',
		noiDung: 'Phân biệt sự khác nhau giữa Data và Information.',
	},

	// Khối: Chuẩn hóa
	{
		maCauHoi: 'CH_CSDL_04',
		maMon: 'CSDL',
		maKhoi: 'CHUANHOA',
		mucDo: 'TRUNGBINH',
		noiDung: 'Định nghĩa dạng chuẩn 1NF.',
	},
	{
		maCauHoi: 'CH_CSDL_05',
		maMon: 'CSDL',
		maKhoi: 'CHUANHOA',
		mucDo: 'KHO',
		noiDung: 'Cho lược đồ R(ABCD) có phụ thuộc hàm AB->C, C->D. Xác định dạng chuẩn cao nhất.',
	},
	{
		maCauHoi: 'CH_CSDL_06',
		maMon: 'CSDL',
		maKhoi: 'CHUANHOA',
		mucDo: 'RATKHO',
		noiDung: 'Chứng minh định lý Heath trong phân rã lược đồ quan hệ.',
	},

	// Khối: SQL
	{
		maCauHoi: 'CH_CSDL_07',
		maMon: 'CSDL',
		maKhoi: 'SQL',
		mucDo: 'DE',
		noiDung: 'Viết lệnh tạo bảng SINHVIEN gồm (MaSV, HoTen, NgaySinh).',
	},
	{
		maCauHoi: 'CH_CSDL_08',
		maMon: 'CSDL',
		maKhoi: 'SQL',
		mucDo: 'TRUNGBINH',
		noiDung: 'Sử dụng mệnh đề GROUP BY để tính điểm trung bình từng lớp.',
	},
	{
		maCauHoi: 'CH_CSDL_09',
		maMon: 'CSDL',
		maKhoi: 'SQL',
		mucDo: 'KHO',
		noiDung: 'Viết Subquery tìm các sinh viên có điểm cao hơn điểm trung bình của khoa CNTT.',
	},

	// --- MÔN LẬP TRÌNH WEB ---
	// Khối: HTML/CSS
	{
		maCauHoi: 'CH_WEB_01',
		maMon: 'WEB',
		maKhoi: 'HTML_CSS',
		mucDo: 'DE',
		noiDung: 'Thẻ <a> dùng để làm gì trong HTML?',
	},
	{
		maCauHoi: 'CH_WEB_02',
		maMon: 'WEB',
		maKhoi: 'HTML_CSS',
		mucDo: 'TRUNGBINH',
		noiDung: 'Giải thích mô hình Box Model trong CSS.',
	},
	{
		maCauHoi: 'CH_WEB_03',
		maMon: 'WEB',
		maKhoi: 'HTML_CSS',
		mucDo: 'KHO',
		noiDung: 'Phân biệt giữa Flexbox và CSS Grid khi nào nên dùng cái nào?',
	},

	// Khối: Javascript
	{
		maCauHoi: 'CH_WEB_04',
		maMon: 'WEB',
		maKhoi: 'JAVASCRIPT',
		mucDo: 'DE',
		noiDung: 'Biến let và const khác nhau như thế nào?',
	},
	{
		maCauHoi: 'CH_WEB_05',
		maMon: 'WEB',
		maKhoi: 'JAVASCRIPT',
		mucDo: 'TRUNGBINH',
		noiDung: 'Promise trong JS dùng để xử lý vấn đề gì?',
	},
	{
		maCauHoi: 'CH_WEB_06',
		maMon: 'WEB',
		maKhoi: 'JAVASCRIPT',
		mucDo: 'KHO',
		noiDung: 'Closure là gì? Cho ví dụ minh họa.',
	},

	// Khối: React
	{ maCauHoi: 'CH_WEB_07', maMon: 'WEB', maKhoi: 'REACT', mucDo: 'DE', noiDung: 'JSX là gì?' },
	{
		maCauHoi: 'CH_WEB_08',
		maMon: 'WEB',
		maKhoi: 'REACT',
		mucDo: 'TRUNGBINH',
		noiDung: 'Sự khác nhau giữa Props và State là gì?',
	},
	{
		maCauHoi: 'CH_WEB_09',
		maMon: 'WEB',
		maKhoi: 'REACT',
		mucDo: 'KHO',
		noiDung: 'Vòng đời của một Component trong React (Lifecycle) diễn ra như thế nào?',
	},
	{
		maCauHoi: 'CH_WEB_10',
		maMon: 'WEB',
		maKhoi: 'REACT',
		mucDo: 'RATKHO',
		noiDung: 'Tối ưu hiệu năng React với useMemo và useCallback khi nào?',
	},
];
export const cauTrucDeList: CauTrucDe[] = [];
export const deThiList: DeThi[] = [];
