import React, {Component} from 'react';
import './AboutUsPage.scss'
import aboutUsbanner from '../../../base/image/about-us-banner.jpg'
import BackTopButton from "../../../common/backTopButton/BackTopButton";

class AboutUsPage extends Component {
    render() {
        return (
            <div className='about-us-contaier'>
                <div className="about-us-banner">
                    <img src={aboutUsbanner} alt=""/>
                </div>
                <div className="content">
                    <div className="about-us-title">
                        Cách tiếp cận của chúng tôi
                    </div>
                    <div className="about-us-sub-title">
                        Mọi người tìm đến Phòng khám Riordan để phục hồi, cải thiện và duy trì sức khỏe
                    </div>
                    <div className="about-us-content">
                        Trong hơn 47 năm, các nhà cung cấp của chúng tôi đã kết hợp tốt nhất các loại thuốc chỉnh hình,
                        chức năng, liệu pháp tự nhiên và tích hợp để xác định nguyên nhân cơ bản hoặc gốc rễ của các
                        triệu chứng (bệnh nhân) đồng học và lập kế hoạch chăm sóc bệnh nhân tùy chỉnh để ngăn chặn và
                        đảo ngược các tình trạng đó.

                        Phòng khám Riordan được thành lập như một tổ chức phi lợi nhuận 501 (c)(3) với sứ mệnh nghiên
                        cứu, giáo dục nhà cung cấp và giáo dục bệnh nhân.
                    </div>
                    <div className="about-us-bold">
                        TẦM NHÌN
                    </div>
                    <div className="about-us-bold-content">
                        Dẫn đầu thế giới về chăm sóc sức khỏe tích hợp thông qua khoa học, tự nhiên và giáo dục.
                    </div>
                    <div className="about-us-bold">
                        NHIỆM VỤ
                    </div>
                    <div className="about-us-bold-content">
                        Phục vụ cộng đồng bằng cách tăng cường sức khỏe thông qua chăm sóc tích hợp, giáo dục và nghiên
                        cứu để truyền cảm hứng cho hy vọng và chữa bệnh.
                    </div>
                    <div className="about-us-bold">
                        NHỮNG GIÁ TRỊ CỐT LÕI
                    </div>
                    <div className="about-us-bold-content">
                        <strong>Đổi mới</strong> – Chủ động giải quyết các tình trạng sức khỏe phức tạp, xác định nguyên
                        nhân gốc rễ và thực hiện các giải pháp một cách sáng tạo để mang lại chất lượng cuộc sống được
                        cải thiện và sự tiến bộ của y học.
                    </div>
                    <div className="about-us-bold-content">
                        <strong>Dịch vụ</strong> – Cung cấp các nguồn lực cộng đồng chăm sóc sức khỏe và chăm sóc lấy
                        bệnh nhân làm trung tâm dẫn đến kết quả có ý nghĩa và trải nghiệm đặc biệt.
                    </div>
                    <div className="about-us-bold-content">
                        <strong>Hy vọng </strong> – Truyền cảm hứng cho niềm hy vọng và sự chữa lành thông qua nghiên
                        cứu sáng tạo và liên tục thách thức các tiêu chuẩn chăm sóc.
                    </div>
                    <div className="about-us-bold-content">
                        <strong>Hợp tác </strong> – Thu hút bệnh nhân, người hành nghề và cộng đồng tham gia vào các
                        sáng kiến ​​giáo dục thúc đẩy sức khỏe thực sự.
                    </div>
                    <div className="about-us-bold-content">
                        <strong>Chính trực</strong> – Tuân thủ các nguyên tắc đạo đức và tiêu chuẩn nghề nghiệp cao nhất
                        để nhận được sự tôn trọng và tin tưởng.
                    </div>

                    <div className="about-us-title">
                        Cách tiếp cận của chúng tôi
                    </div>
                    <div className="about-us-content">
                        Chúng tôi có hơn bốn thập kỷ kinh nghiệm trong việc điều trị thành công nhiều loại bệnh dai dẳng
                        bao gồm:
                    </div>
                    <div className="about-us-bold-content">
                        1. Bệnh ung thư<br/>
                        2. Bệnh Lyme<br/>
                        3. Bệnh tim<br/>
                        4. Hội chứng mệt mỏi mãn tính<br/>
                        5. Đau cơ xơ hóa<br/>
                        6. Bệnh tiểu đường<br/>
                        7. Rối loạn tự miễn dịch<br/>
                        8. Các vấn đề về đường ruột<br/>
                        9. Nhạy cảm với thực phẩm<br/>
                        10. Và hơn thế nữa<br/>
                    </div>
                    <div className="about-us-content">
                        Một số câu chuyện thành công đáng khích lệ nhất của chúng tôi là với những bệnh nhân có nhiều
                        triệu chứng lâu dài nhưng không thể chẩn đoán được. Chúng tôi tìm cách xác định các nguyên nhân
                        cơ bản của bệnh tật và khắc phục chúng bằng cách cân bằng dinh dưỡng và các liệu pháp khác.
                    </div>
                    <div className="about-us-content">
                        Các triệu chứng như mệt mỏi, phát ban, táo bón, cứng khớp, sưng tấy, trầm cảm và nhiều triệu
                        chứng khác là biểu hiện của sự mất cân bằng hóa học trong cơ thể. Tại Phòng khám Riordan, chúng
                        tôi biết rằng các chất dinh dưỡng trong cơ thể kiểm soát chất hóa học của chúng ta và nếu nguồn
                        cung cấp chất dinh dưỡng của chúng ta thấp hoặc dư thừa một số chất dinh dưỡng, các triệu chứng
                        là không thể tránh khỏi. Vì lý do này, các bệnh nhân của chúng tôi, được gọi là những người đồng
                        học, bắt đầu với bảng kiểm kê chất dinh dưỡng cơ bản được đặt hàng để các bác sĩ có thể tìm hiểu
                        thêm về tính cách cá nhân của họ.
                    </div>
                    <div className="about-us-content">
                        Cách tiếp cận của chúng tôi là điều trị cho toàn bộ con người, bắt đầu bằng việc xem xét kỹ
                        lưỡng tiền sử bệnh và đánh giá bệnh nhân toàn diện. Điều này mang lại một kế hoạch điều trị toàn
                        diện được tùy chỉnh cao sẽ giúp bạn có được sức khỏe tốt hơn. Là một bệnh nhân tại Phòng khám
                        Riordan, bạn sẽ tham gia đầy đủ vào quá trình khám phá sức khỏe. Bằng cách đóng vai trò tích cực
                        trong quá trình phục hồi của mình, bạn sẽ hiểu rõ hơn về nguyên nhân toàn thân gây ra bệnh tật
                        của mình, từ đó có tác động tích cực đến sức khỏe của mình.
                    </div>
                    <div className="about-us-content">
                        Nhiều bệnh nhân chỉ sử dụng Phòng khám Riordan để giải quyết các vấn đề sức khỏe của họ, những
                        người khác chọn kết hợp các liệu pháp của chúng tôi với các liệu pháp của bác sĩ truyền thống
                        của họ. Chúng tôi cung cấp hình thức chữa bệnh cuối cùng - hy vọng. Cho dù bạn đang ở giai đoạn
                        đầu của con đường hướng tới sức khỏe hay bạn đã gặp thử thách trong nhiều năm, chúng tôi đều có
                        thể giúp đỡ. Hãy chịu trách nhiệm về sức khỏe của bạn bằng cách trở thành bệnh nhân tại Phòng
                        khám Riordan ngay hôm nay.
                    </div>
                    <div className="about-us-bold">
                        SỨC KHOẺ THỰC SỰ LÀ…
                    </div>
                    <div className="about-us-bold-content">
                        1. Trao quyền cho chính chúng ta với tư cách là những người cùng học.<br/>
                        2. Sửa chữa các rối loạn chức năng có thể đo lường được.
                        3. Biến thức ăn thành thuốc của chúng ta.<br/>
                        4. Nuôi dưỡng dự trữ lành mạnh.<br/>
                        5. Tìm ra nguyên nhân thực sự của bệnh tật.<br/>
                        6. Áp dụng các lựa chọn lối sống tốt hơn.<br/>
                        7. Chăm sóc toàn diện cho con người.<br/>
                        8.Tôn vinh sức mạnh chữa bệnh của thiên nhiên.<br/>
                    </div>
                </div>
                <BackTopButton></BackTopButton>
            </div>
        );
    }
}

export default AboutUsPage;