import Step1_1_1 from "../../assets/instructions/step1/1_1.webp"
import Step1_2_1 from "../../assets/instructions/step1/2_1.webp"
import Step1_3_1 from "../../assets/instructions/step1/3_1.webp"
import Step1_3_2 from "../../assets/instructions/step1/3_2.webp";
import Step1_4_1 from "../../assets/instructions/step1/4_1.webp";
import Step1_5_1 from "../../assets/instructions/step1/5_1.webp";
import Step1_6_1 from "../../assets/instructions/step1/6_1.webp";

// 1, 2, 3, 4, 5_1, 5_2, 6, 7_1, 7_2 for step2
import Step2_1_1 from "../../assets/instructions/step2/1_1.webp"
import Step2_2_1 from "../../assets/instructions/step2/2_1.webp"
import Step2_3_1 from "../../assets/instructions/step2/3_1.webp"
import Step2_4_1 from "../../assets/instructions/step2/4_1.webp"
import Step2_5_1 from "../../assets/instructions/step2/5_1.webp"
import Step2_6_1 from "../../assets/instructions/step2/6_1.webp"
import Step2_7_1 from "../../assets/instructions/step2/7_1.webp"
import Step2_7_2 from "../../assets/instructions/step2/7_2.webp"

// 1, 2, 3, 4_1, 4_2, 5_1, 5_2, 6, 7_1, 7_2 for step3
import Step3_1_1 from "../../assets/instructions/step3/1_1.webp"
import Step3_2_1 from "../../assets/instructions/step3/2_1.webp"
import Step3_3_1 from "../../assets/instructions/step3/3_1.webp"
import Step3_4_1 from "../../assets/instructions/step3/4_1.webp"
import Step3_4_2 from "../../assets/instructions/step3/4_2.webp"
import Step3_5_1 from "../../assets/instructions/step3/5_1.webp"
import Step3_6_1 from "../../assets/instructions/step3/6_1.webp"
import Step3_6_2 from "../../assets/instructions/step3/6_2.webp"


// 1, 2, 3, 4, 5, 6, 7, 8 for step4
import Step4_1_1 from "../../assets/instructions/step4/1_1.webp"
import Step4_2_1 from "../../assets/instructions/step4/2_1.webp"
import Step4_3_1 from "../../assets/instructions/step4/3_1.webp"
import Step4_4_1 from "../../assets/instructions/step4/4_1.webp"
import Step4_5_1 from "../../assets/instructions/step4/5_1.png"
import Step4_6_1 from "../../assets/instructions/step4/6_1.webp"

// 1, 2, 3, 4, 5, 6, 7, 8 for step5
import Step5_1_1 from "../../assets/instructions/step5/1_1.webp"
import Step5_2_1 from "../../assets/instructions/step5/2_1.webp"
import Step5_3_1 from "../../assets/instructions/step5/3_1.webp"
import Step5_4_1 from "../../assets/instructions/step5/4_1.webp"
import Step5_5_1 from "../../assets/instructions/step5/5_1.webp"
import Step5_6_1 from "../../assets/instructions/step5/6_1.webp"
import Step5_7_1 from "../../assets/instructions/step5/7_1.webp"
import Step5_8_1 from "../../assets/instructions/step5/8_1.webp"

const INSTRUCTIONS = [
    {
        title: "註冊流程",
        text: "輕鬆完成註冊，開啟專屬您的國泰人壽數位服務體驗",
        details: [
            {
                title: "步驟一、點選馬上註冊",
                images: [Step1_1_1],
            },
            {
                title: "步驟二、閱讀聲明",
                images: [Step1_2_1],
            },
            {
                title: "步驟三、填寫基本資料",
                images: [Step1_3_1, Step1_3_2],
            },
            {
                title: "步驟四、輸入OTP驗證",
                images: [Step1_4_1],
            },
            {
                title: "步驟五、設定密碼",
                images: [Step1_5_1],
            },
            {
                title: "步驟六、完成註冊",
                images: [Step1_6_1],
            },
        ],
    },
    {
        title: "臉部辨識登入",
        text: "透過設定Face ID，自動完成身分驗證",
        details: [
            {
                title: "步驟一、點選快速登入",
                images: [Step2_1_1],
            },
            {
                title: "步驟二、使用密碼登入",
                images: [Step2_2_1],
            },
            {
                title: "步驟三、選擇Face ID登入",
                images: [Step2_3_1],
            },
            {
                title: "步驟四、閱讀聲明",
                images: [Step2_4_1],
            },
            {
                title: "步驟五、臉部掃描",
                images: [Step2_5_1],
            },
            {
                title: "步驟六、設定成功",
                images: [Step2_6_1],
            },
            {
                title: "步驟七、掃描登入",
                images: [Step2_7_1, Step2_7_2],
            },
        ],
    },
    {
        title: "手勢圖形登入",
        text: "以手勢預設圖形，快速完成身分確認",
        details: [
            {
                title: "步驟一、點選快速登入",
                images: [Step3_1_1],
            },
            {
                title: "步驟二、使用密碼登入",
                images: [Step3_2_1],
            },
            {
                title: "步驟三、選擇手勢登入",
                images: [Step3_3_1],
            },
            {
                title: "步驟四、繪圖確認",
                images: [Step3_4_1, Step3_4_2],
            },
            {
                title: "步驟五、設定成功",
                images: [Step3_5_1],
            },
            {
                title: "步驟六、手勢登入",
                images: [Step3_6_1, Step3_6_2],
            },
        ],
    },
    {
        title: "忘記密碼",
        text: "透過簡易驗證安全重設登入密碼，保障帳戶安全",
        details: [
            {
                title: "步驟一、點選忘記密碼",
                images: [Step4_1_1],
            },
            {
                title: "步驟二、進行資料驗證",
                images: [Step4_2_1],
            },
            // {
            //     title: "步驟三、資料驗證（已填寫）",
            //     images: [Step4_3_1],
            // },
            {
                title: "步驟三、發送驗證碼",
                images: [Step4_3_1],
            },
            // {
            //     title: "步驟五、輸入驗證碼",
            //     images: [Step4_5_1],
            // },
            {
                title: "步驟四、輸入驗證碼",
                images: [Step4_4_1],
            },
            {
                title: "步驟五、設定新密碼",
                images: [Step4_5_1],
            },
            {
                title: "步驟六、設定成功",
                images: [Step4_6_1],
            },
        ],
    },
    {
        title: "小樹點綁定",
        text: "加入小樹會員，一起進入小樹生活圈",
        details: [
            {
                title: "步驟一、點選更多",
                images: [Step5_1_1],
            },
            {
                title: "步驟二、點選點數/任務",
                images: [Step5_2_1],
            },
            {
                title: "步驟三、點選立即綁定",
                images: [Step5_3_1],
            },
            {
                title: "步驟四、閱讀聲明",
                images: [Step5_4_1],
            },
            {
                title: "步驟五、輸入手機號碼",
                images: [Step5_5_1],
            },
            {
                title: "步驟六、輸入密碼",
                images: [Step5_6_1],
            },
            {
                title: "步驟七、允許存取授權",
                images: [Step5_7_1],
            },
            {
                title: "步驟八、設定成功",
                images: [Step5_8_1],
            },
        ],
    },
];

export default INSTRUCTIONS;
