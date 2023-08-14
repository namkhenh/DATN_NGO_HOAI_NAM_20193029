import React, {Component, useEffect} from 'react';
import './ServicePage.scss'
import servicebanner from '../../../base/image/service-banner.jpg'
import BackTopButton from '../../../common/backTopButton/BackTopButton';

export default function ServicePage() {
    return (
        <div className='service-contaier'>
            <div className="service-banner">
                <img src={servicebanner} alt="" />
            </div>
            <div className="content">
                <div className="service-title">
                    Dịch vụ
                </div>
                <div className="service-sub-title">
                    Luôn mang tới những giải pháp tốt nhất
                </div>
                <div className="service-content">
                    Phòng khám Riordan là một tổ chức phi lợi nhuận tính phí thấp nhất có thể cho các dịch vụ của
                    chúng tôi trong khi vẫn duy trì chất lượng cao nhất có thể. Duyệt qua các dịch vụ của chúng tôi
                    dưới đây, chúng tôi mong muốn được tham gia cùng bạn trong hành trình sức khỏe của bạn.
                </div>
                <div className="service-title">
                    Y học tích hợp
                </div>
                <div className="service-content">
                    Y học tích hợp là gì? Một cách tiếp cận cá nhân để chữa bệnh và đạt được kết quả sức khỏe tốt
                    nhất có thể. Các thuật ngữ thuốc "bổ sung" và "thay thế" thường được sử dụng thay thế cho nhau
                    nhưng có thể đề cập đến các loại thuốc khác nhau cho những người khác nhau. Cùng nhau, đôi khi
                    chúng được gọi bằng từ viết tắt CAM. Y học tích hợp, theo định nghĩa của Trung tâm Quốc gia về Y
                    học Bổ sung và Thay thế tại Viện Y tế Quốc gia, "kết hợp các liệu pháp y tế chính thống và liệu
                    pháp CAM mà có một số bằng chứng khoa học chất lượng cao về tính an toàn và hiệu quả." Y học
                    tích hợp điều trị toàn bộ con người với sự kết hợp của các thực hành y học chức năng, tự nhiên,
                    chỉnh hình và allopathic. Đó là sự hợp tác giữa nhà cung cấp và bệnh nhân để cùng nhau khám phá
                    nguyên nhân gốc rễ của bệnh tật.
                </div>
                <div className="service-title">
                    Y học tự nhiên
                </div>
                <div className="service-content">
                    Các bác sĩ trị liệu tự nhiên (N.D.) kết hợp sự khôn ngoan của thiên nhiên với sự khắc nghiệt của
                    khoa học hiện đại. Thấm nhuần các phương pháp, nguyên tắc và thực hành chữa bệnh truyền thống, y
                    học tự nhiên tập trung vào phòng ngừa toàn diện, chủ động và chẩn đoán và điều trị toàn diện.
                    Bằng cách sử dụng các giao thức giảm thiểu nguy cơ gây hại, các bác sĩ trị liệu tự nhiên giúp
                    tạo điều kiện cho khả năng vốn có của cơ thể để phục hồi và duy trì sức khỏe tối ưu. Vai trò của
                    bác sĩ trị liệu tự nhiên là xác định và loại bỏ các rào cản đối với sức khỏe tốt bằng cách giúp
                    tạo ra một môi trường chữa bệnh bên trong và bên ngoài.

                    Các bác sĩ Naturopathic điều trị tất cả các điều kiện y tế và có thể cung cấp cả chăm sóc sức
                    khỏe cá nhân và gia đình. Trong số các bệnh phổ biến nhất mà họ điều trị là dị ứng, đau mãn
                    tính, các vấn đề tiêu hóa, mất cân bằng nội tiết tố, béo phì, bệnh hô hấp, bệnh tim, các vấn đề
                    về khả năng sinh sản, mãn kinh, mệt mỏi tuyến thượng thận, ung thư, đau cơ xơ hóa và hội chứng
                    mệt mỏi mãn tính. Các bác sĩ tự nhiên có thể thực hiện các ca phẫu thuật nhỏ, chẳng hạn như loại
                    bỏ u nang hoặc khâu vết thương bề mặt. Tuy nhiên, họ không thực hành phẫu thuật lớn. Các bác sĩ
                    Naturopathic được đào tạo để sử dụng thuốc theo toa, mặc dù sự nhấn mạnh của y học tự nhiên là
                    việc sử dụng các chất chữa bệnh tự nhiên.

                    Một bác sĩ Naturopathic đã hoàn thành một nền giáo dục y tế sau đại học chuyên về y học tự nhiên
                    chăm sóc ban đầu. Các bác sĩ trị liệu tự nhiên khác với các bác sĩ châm cứu, bác sĩ chỉnh hình,
                    nắn xương và bác sĩ y khoa. Họ được đào tạo độc đáo để cung cấp một cách tiếp cận toàn diện và
                    tích hợp để hỗ trợ quá trình chữa bệnh bẩm sinh của cơ thể bạn. Các bác sĩ trị liệu tự nhiên có
                    kỹ năng chẩn đoán và điều trị bệnh bằng cách sử dụng liệu pháp tự nhiên bao gồm dinh dưỡng lâm
                    sàng, y học thực vật, tư vấn lối sống, vi lượng đồng căn, y học vật lý và thủy trị liệu. Họ điều
                    chỉnh các phương pháp này theo nhu cầu của từng bệnh nhân. Y học tự nhiên có hiệu quả trong điều
                    trị hầu hết các vấn đề sức khỏe, cho dù cấp tính hay mãn tính. Các bác sĩ trị liệu tự nhiên hợp
                    tác với tất cả các chi nhánh khác trong lĩnh vực y tế, giới thiệu bệnh nhân đến các học viên
                    khác để chẩn đoán hoặc điều trị khi thích hợp.

                    Như với tất cả các bác sĩ ngày nay, các bác sĩ Naturopathic được đào tạo tại các tổ chức y tế
                    được công nhận, bốn đến năm năm, sau đại học. Khóa đào tạo bao gồm một nghiên cứu toàn diện về
                    các ngành khoa học y tế thông thường, bao gồm giải phẫu, sinh lý học, bệnh lý, vi sinh, miễn
                    dịch học, chẩn đoán lâm sàng và thể chất, chẩn đoán trong phòng thí nghiệm, tim mạch, tiêu hóa,
                    phụ khoa, v.v., cũng như nghiên cứu chi tiết về nhiều loại liệu pháp tự nhiên. Trong hai năm
                    cuối đào tạo lâm sàng chuyên sâu, ND học cách tích hợp các nguyên tắc của y học tự nhiên vào
                    thực hành lâm sàng.
                </div>
                <div className="service-title">
                    Ung thư tích hợp
                </div>
                <div className="service-content">
                    Ung thư tích hợp là gì? Ung thư thông thường điều trị ung thư. Ung thư tích hợp vượt ra ngoài để
                    điều trị cho bệnh nhân bị ung thư - chăm sóc ung thư toàn thân. Mỗi bệnh nhân là duy nhất. Các
                    yếu tố góp phần vào việc chăm sóc ung thư của họ là duy nhất. Lịch sử gia đình và di truyền của
                    họ là duy nhất. Tiếp xúc với môi trường và lối sống của họ là duy nhất. Cách bệnh nhân đáp ứng
                    với các liệu pháp thông thường và tích hợp là duy nhất. Ung thư tích hợp tạo nền tảng cho các kế
                    hoạch chăm sóc tùy chỉnh để đạt được kết quả tốt hơn, ít tác dụng phụ hơn, chất lượng cuộc sống
                    tốt hơn và hy vọng.
                </div>
                <div className="service-title">
                    Y học chức năng
                </div>
                <div className="service-content">
                    Nguồn của bạn cho một phương pháp chăm sóc sức khỏe tích hợp, dựa trên khoa học Là những người
                    hành nghề Y học chức năng, mục tiêu của chúng tôi là giúp bệnh nhân nhận ra rằng sức khỏe chỉ
                    đơn giản là cơ thể làm tốt nhất có thể với những gì nó đã được cung cấp để làm việc. Chúng tôi
                    sử dụng phương pháp tiếp cận theo định hướng hệ thống, lấy bệnh nhân làm trung tâm, định hướng
                    hệ thống, coi bệnh nhân là người đồng học trên con đường đến với sức khỏe. Y học tự nhiên (hoặc
                    y học môi trường) là một sự phù hợp tự nhiên cho một học viên Y học chức năng bởi vì cùng với
                    việc xem xét những gì cơ thể đang thiếu mà nó cần, vai trò của môi trường của người học đồng học
                    có thể có trong việc tạo gánh nặng cho nó với những gì nó không cần cũng được xem xét. Độc tố
                    trong môi trường được xác định và một chương trình bổ sung / làm sạch an toàn, hiệu quả được bắt
                    đầu.

                    Y học chức năng và tự nhiên là các phương pháp chăm sóc sức khỏe tích hợp, dựa trên khoa học.
                    Các học viên xem xét các tương tác phức tạp của lịch sử bệnh nhân, sinh lý và lối sống có thể
                    dẫn đến bệnh tật.
                </div>
                <div className="service-title">
                    Dịch vụ phòng thí nghiệm
                </div>
                <div className="service-content">
                    Tăng cường hệ thống với các phương pháp điều trị tự nhiên và chất dinh dưỡng. Để đạt được sức
                    khỏe và sức khỏe tối ưu, điều quan trọng là phải ngăn ngừa các bệnh mãn tính. Các tài liệu y
                    khoa chứa đầy các báo cáo cho thấy nhiều điều kiện có thể được ngăn ngừa bằng cách có đủ lượng
                    chất dinh dưỡng nhất định trong cơ thể. Người sáng lập, Tiến sĩ Hugh Riordan tin rằng mọi người
                    đều có một cá tính sinh hóa độc đáo và việc kiểm tra và sửa chữa sự thiếu hụt chất dinh dưỡng có
                    thể cung cấp thông tin quan trọng cho bác sĩ và giúp bệnh nhân, hoặc người đồng học, hiểu cơ thể
                    của chính họ. Đó là cách Phòng khám Riordan bắt đầu.

                    Với chứng nhận CLIA liên tục kể từ năm 1976, phòng thí nghiệm cung cấp các dịch vụ phòng thí
                    nghiệm lâm sàng tiên tiến nhất để đánh giá sự thiếu hụt dinh dưỡng cũng như xét nghiệm pyrolles,
                    histamine, nhạy cảm với thực phẩm gây độc tế bào, ký sinh trùng và phân tích axit béo hồng cầu.
                    Phòng thí nghiệm Bio-Center tại Riordan Clinic sử dụng công nghệ tiên tiến nhất và cung cấp dịch
                    vụ chất lượng cao nhất.
                </div>
            </div>
            <BackTopButton></BackTopButton>
        </div>
    );
}
