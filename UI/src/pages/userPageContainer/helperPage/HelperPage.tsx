import React from 'react'
import './HelperPage.scss'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HeaderPage from '../../../structure/headerPage/HeaderPage';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';

function HelperPage() {
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };
    return (
        <div className='helper-page'>
            <HeaderPage
                icon={<HelpOutlineOutlinedIcon/>}
                text="Trợ giúp"
            />
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Vì sao tôi nên đăng ký tài khoản?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Đăng ký tài khoản thành viên ở Riordan Clinic đem lại cho bạn nhiều lợi ích hơn như giúp bạn lưu
                        trữ các thông tin sức khỏe cá nhân, đặt lịch khám với bác sĩ, tham gia các cộng đồng sức khỏe
                        của Riordan Clinic cũng như hỗ trợ Riordan Clinic cá nhân hóa trải nghiệm sử dụng nền tảng của
                        bạn.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography>Đăng ký ở Riordan Clinic có mất phí không?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Miễn phí và luôn luôn miễn phí! Tuy nhiên, một số dịch vụ giúp bạn kết nối với bên thứ ba có thể
                        tính phí nhất định cho bạn. Để biết thêm thông tin, vui lòng xem thêm tại chính sách Quảng cáo &
                        Tài trợ của chúng tôi.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                >
                    <Typography>Nếu tôi có thắc mắc liên quan đến sức khỏe, làm thế nào để đặt câu hỏi?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Sử dụng Riordan Clinic không thay thế cho việc khám bệnh cùng một chuyên gia y tế. Chúng tôi
                        không cung cấp các chẩn đoán, lời khuyên hay điều trị y khoa. Hãy luôn luôn tham vấn ý kiến bác
                        sĩ hoặc chuyên gia - những người có chuyên môn và thẩm quyền.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel4a-content"
                    id="panel4a-header"
                >
                    <Typography>Tôi quan ngại về quyền riêng tư của mình</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Miễn phí và luôn luôn miễn phí! Tuy nhiên, một số dịch vụ giúp bạn kết nối với bên thứ ba có thể
                        tính phí nhất định cho bạn. Để biết thêm thông tin, vui lòng xem thêm tại chính sách Quảng cáo &
                        Tài trợ của chúng tôi.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel5a-content"
                    id="panel5a-header"
                >
                    <Typography>Tôi muốn xóa tài khoản và hủy đăng ký</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Bạn có thể xóa tài khoản của mình bất kỳ lúc nào bằng cách đăng nhập và đến trang Hồ sơ.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel6a-content"
                    id="panel6a-header"
                >
                    <Typography>Nếu tôi xóa tài khoản, dữ liệu của tôi sẽ ra sao?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Một khi đã xóa tài khoản, toàn bộ dữ liệu cá nhân của bạn cũng sẽ được xóa. Chúng tôi có thể lưu
                        trữ các dữ liệu này trong vòng tối đa 90 ngày sau khi xóa tài khoản, phòng trường hợp bạn muốn
                        đăng ký lại.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default HelperPage