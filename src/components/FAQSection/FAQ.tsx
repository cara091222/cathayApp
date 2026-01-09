

export interface FAQ {
    category: string;
    items: {
        title: string;
        content: string;
    }[];
}

const FAQs = [
    {
        category: "會員資格與登入設定",
        items: [
            {
                title: "下載國泰人壽App須具有保戶身份嗎？",
                content: "國泰人壽App不需要保戶身分即可下載並註冊。",
            },
            {
                title: "我的會員資料有誤，如何進行變更？",
                content:
                    "(1)手機、E-mail：目前開放具有網路服務資格者，可自行於線上修改，請登入國泰人壽App→更多→查看資訊→進行變更。\n(2)姓名、生日、國籍：請撥打客服專線由專人為您服務，或至服務據點由專人協助變更。",
            },
            {
                title: "如何使用快速登入？",
                content:
                    "(1)先使用帳號密碼登入國泰人壽App→點擊「更多」Tab→「帳戶與App設定」→「快速登入設定」，即可設定生物辨識(Face ID/指紋)或手勢登入等方式。\n(2)提醒您，生物辨識功能要手機本身有支援才能使用喔！",
            },
        ],
    },
    {
        category: "保單服務與繳費資訊",
        items: [
            {
                title: "欲進行保單驗證，如何查找保單號碼？",
                content:
                    "可以透過保單文件、繳費通知單、電子保單或Email通知查詢保單號碼，若仍找不到，也可請客服或您的業務員協助。",
            },
            {
                title: "如何查詢保單繳費資訊？ ",
                content:
                    "登入國泰人壽App→保單總覽→點擊「查看保單」→點擊欲查詢的保單→繳費資訊，即可查看保單繳費資訊。",
            },
            {
                title: "如何查看投資型保單績效？",
                content:
                    "登入國泰人壽App→保單總覽→點擊「資產總覽」區塊牌卡，即可查看投資型保單詳細資訊。",
            },
        ],
    },
    {
        category: "外溢保單與健康數據",
        items: [
            {
                title: "如何查看外溢保單達標資訊？",
                content:
                    "登入國泰人壽App→保單總覽→點擊「查看保單」→點擊任一外溢保單牌卡→切換至「外溢回饋」Tab，即可查看外溢折減回饋資訊。",
            },
            {
                title: "如何查詢健康任務或健康數據？",
                content: (
                    <span>
                        健康相關資訊可至
                        <a
                            href="https://wellness.cathaylife.com.tw/fitback/"
                            target="_blank"
                        >
                            「FitBack健康吧」專站
                        </a>
                        ，或撥打客服專線由專人為您服務。
                    </span>
                ),
            },
        ],
    },
];

export default FAQs;