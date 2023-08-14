import React, { useEffect, useState } from 'react'
import './HealthInfoPage.scss'
import {TextField} from '../../../../common/textField/TextField'
import {DatePicker} from '../../../../common/datePicker/DatePicker'
import {Dropdown} from '../../../../common/dropdown/DropDown'
import Button from '@mui/material/Button'
import {ButtonVariantType} from '../../../../model/enum/buttonEnum'

function HealthInfoPage() {
    const [Circuit, setCircuit] = useState<number>(0)
    const [Temperature, setTemperature] = useState<number>(0)
    const [BloodPressure, setBloodPressure] = useState<number>(0)
    const [Breathing, setBreathing] = useState<number>(0)
    const [Height, setHeight] = useState<number>(0)
    const [Weight, setWeight] = useState<number>(0)
    const [BMI, setBMI] = useState<number>(0)
    const [PersonalHistory, setPersonalHistory] = useState<string>('')
    const [FamilyHistory, setFamilyHistory] = useState<string>('')
    const [DrugAlergy, setDrugAlergy] = useState<string>('')
    const [PathologicalProcess, setPathologicalProcess] = useState<string>('')
    const [Reason, setReason] = useState<string>('')
    const [Doctor, setDoctor] = useState<string>('')
    const [Body, setBody] = useState<string>('')
    const [BodyPart, setBodyPart] = useState<string>('')
    const [PreliminaryDiagnosis, setPreliminaryDiagnosis] = useState<string>('')
    const [ComorbiditiesDiagnosis, setComorbiditiesDiagnosis] = useState<string>('')
    const [Subclinical, setSubclinical] = useState<string>('')
    const [ExamStartTime, setExamStartTime] = useState<Date>(new Date())
    const [ExamEndTime, setExamEndTime] = useState<Date>(new Date())
    const [Conclude, setConclude] = useState<string>('')
    const [MainDiseaseDiagnosis, setMainDiseaseDiagnosis] = useState<string>('')
    const [ICD10, setICD10] = useState<string>('')
    const [DiseasesInclude, setDiseasesInclude] = useState<string>('')
    const [HealthCondition, setHealthCondition] = useState<string>('')

    useEffect(() => {
        const timer = setInterval(() => {
            setExamEndTime(new Date());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div className='healthinfo-page'>
            <div className="healthinfo-wrap">
                <div className="healthinfo-title">
                    Chỉ số sống
                </div>
                <div className="healthinfo-body">
                    <div className="healthinfo-body-item">
                        <div className="survival-index">
                            Mạch:
                        </div>
                        <div className="surival-index-input">
                            <TextField
                                type='number'
                                value={String(Circuit)}
                                onChange={(_,value) => setCircuit(Number(value))}
                            />
                        </div>
                        <div className="surival-index-unit">
                            lần/phút
                        </div>
                    </div>
                    <div className="healthinfo-body-item">
                        <div className="survival-index">
                            Nhiệt độ:
                        </div>
                        <div className="surival-index-input">
                            <TextField
                                type='number'
                                value={String(Temperature)}
                                onChange={(_, value) => setTemperature(Number(value))}
                            />
                        </div>
                        <div className="surival-index-unit">
                            °C
                        </div>
                    </div>
                    <div className="healthinfo-body-item">
                        <div className="survival-index">
                            Huyết áp:
                        </div>
                        <div className="surival-index-input">
                            <TextField
                                type='number'
                                value={String(BloodPressure)}
                                onChange={(_, value) => setBloodPressure(Number(value))}
                            />
                        </div>
                        <div className="surival-index-unit">
                            mg/Hg
                        </div>
                    </div>
                    <div className="healthinfo-body-item">
                        <div className="survival-index">
                            Nhịp thở:
                        </div>
                        <div className="surival-index-input">
                            <TextField
                                type='number'
                                value={String(Breathing)}
                                onChange={(_, value) => setBreathing(Number(value))}
                            />
                        </div>
                        <div className="surival-index-unit">
                            lần/phút
                        </div>
                    </div>
                    <div className="healthinfo-body-item">
                        <div className="survival-index">
                            Chiều cao:
                        </div>
                        <div className="surival-index-input">
                            <TextField
                                type='number'
                                value={String(Height)}
                                onChange={(_, value) => setHeight(Number(value))}
                            />
                        </div>
                        <div className="surival-index-unit">
                            cm
                        </div>
                    </div>
                    <div className="healthinfo-body-item">
                        <div className="survival-index">
                            Cân nặng:
                        </div>
                        <div className="surival-index-input">
                            <TextField
                                type='number'
                                value={String(Weight)}
                                onChange={(_, value) => setWeight(Number(value))}
                            />
                        </div>
                        <div className="surival-index-unit">
                            Kg
                        </div>
                    </div>
                    <div className="healthinfo-body-item">
                        <div className="survival-index">
                            BMI:
                        </div>
                        <div className="surival-index-input">
                            <TextField
                                type='number'
                                value={String(BMI)}
                                onChange={(_, value) => setBMI(Number(value))}
                            />
                        </div>
                        <div className="surival-index-unit">
                            kg/m²
                        </div>
                    </div>
                </div>
            </div>
            <div className="healthinfo-wrap">
                <div className="healthinfo-title">
                    Tiền sử bệnh
                </div>
                <div className="healthinfo-body">
                    <div className="healthinfo-body-item width-25 ">
                        <TextField
                            label='Tiền sử bản thân'
                            multiline
                            value={PersonalHistory}
                            onChange={(_, value) => setPersonalHistory(value!)}
                        />
                    </div>
                    <div className="healthinfo-body-item width-25 ">
                        <TextField
                            label='Tiền sử gia đình'
                            multiline
                            value={FamilyHistory}
                            onChange={(_, value) => setFamilyHistory(value!)}
                        />
                    </div>
                    <div className="healthinfo-body-item width-25 ">
                        <TextField
                            label='Dị ứng thuốc'
                            multiline
                            value={DrugAlergy}
                            onChange={(_, value) => setDrugAlergy(value!)}
                        />
                    </div>
                    <div className="healthinfo-body-item width-25 ">
                        <TextField
                            label='Quá trình bệnh lý'
                            multiline
                            value={PathologicalProcess}
                            onChange={(_, value) => setPathologicalProcess(value!)}
                        />
                    </div>
                </div>
            </div>
            <div className="healthinfo-wrap">
                <div className="healthinfo-title">
                    Khám lâm sàng
                </div>
                <div className="healthinfo-body">
                    <div className="healthinfo-body-item width-25 ">
                        <DatePicker
                            placeholder="Chọn một giá trị"
                            ariaLabel="Chọn một giá trị"
                            label='Thời gian khám'
                            isRequired={false}
                            formatDate={(date) => {
                                return `${date!.toString().replace(/GMT\+\d{4} \(.*\)$/, '') }`
                            }}
                            value={new Date(ExamStartTime)}
                            // parseDateFromString={()}'
                            disabled
                        />
                    </div>
                    <div className="healthinfo-body-item width-25 ">
                        <TextField
                            label='Lý do khám'
                            value={Reason}
                            disabled
                        />
                    </div>
                    <div className="healthinfo-body-item width-25 ">
                        <TextField
                            label='Bác sĩ khám'
                            value={Doctor}
                            disabled
                        />
                    </div>
                    <div className="healthinfo-body-item width-25 ">
                        <TextField
                            label='Điều dưỡng'
                            value={Doctor}
                            disabled
                        />
                    </div>
                    <div className="healthinfo-body-item width-25 ">
                        <TextField
                            label='Toàn thân'
                            value={Body}
                            onChange={(_, value) => setBody(value!)}

                        />
                    </div>
                    <div className="healthinfo-body-item width-25 ">
                        <TextField
                            label='Các bộ phận'
                            value={BodyPart}
                            onChange={(_, value) => setBodyPart(value!)}
                        />
                    </div>
                    <div className="healthinfo-body-item width-25 ">
                        <TextField
                            label='Chẩn đoán sơ bộ'
                            value={PreliminaryDiagnosis}
                            onChange={(_, value) => setPreliminaryDiagnosis(value!)}
                        />
                    </div>
                    <div className="healthinfo-body-item width-25 ">
                        <TextField
                            label='Chẩn đoán bệnh kèm theo'
                            value={ComorbiditiesDiagnosis}
                            onChange={(_, value) => setComorbiditiesDiagnosis(value!)}
                        />
                    </div>
                    <div className="healthinfo-body-item width-100 ">
                        <TextField
                            label='Tóm tắt KQ CLS'
                            multiline
                            value={Subclinical}
                            onChange={(_, value) => setSubclinical(value!)}
                        />
                    </div>
                </div>
            </div>
            <div className="healthinfo-wrap">
                <div className="healthinfo-title">
                    Hướng điều trị
                    <Button variant={ButtonVariantType.Contained}>Kết thúc khám</Button>
                </div>
                <div className="healthinfo-body">
                    <div className="healthinfo-body-item width-25 ">
                        <DatePicker
                            placeholder="Chọn một giá trị"
                            ariaLabel="Chọn một giá trị"
                            label='Thời gian kết thúc khám'
                            isRequired={false}
                            formatDate={(date) => {
                                return `${date!.toString().replace(/GMT\+\d{4} \(.*\)$/, '')}`
                            }}
                            value={new Date(ExamEndTime)}
                            disabled
                            maxDate={new Date()}
                        />
                    </div>
                    <div className="healthinfo-body-item width-25 ">
                        <TextField
                            label='Bác sĩ kết luận'
                            value={Doctor}
                            onChange={(_, value) => setDoctor(value!)}
                            disabled
                        />
                    </div>
                    <div className="healthinfo-body-item width-50 ">
                        <TextField
                            label='Kết luận'
                            value={Conclude}
                            onChange={(_, value) => setConclude(value!)}
                        />
                    </div>
                    <div className="healthinfo-body-item width-25 ">
                        <TextField
                            label='Chẩn đoán bệnh chính'
                            value={MainDiseaseDiagnosis}
                            onChange={(_, value) => setMainDiseaseDiagnosis(value!)}
                        />
                    </div>
                    <div className="healthinfo-body-item width-25 ">
                        <TextField
                            label='Diễn giải ICD 10'
                            value={ICD10}
                            onChange={(_, value) => setICD10(value!)}
                        />
                    </div>
                    <div className="healthinfo-body-item width-25 ">
                        <TextField
                            label='Bệnh kèm theo'
                            value={DiseasesInclude}
                            onChange={(_, value) => setDiseasesInclude(value!)}
                        />
                    </div>
                    <div className="healthinfo-body-item width-25 ">
                        <TextField
                            label='Trình trạng'
                            value={HealthCondition}
                            onChange={(_, value) => setHealthCondition(value!)}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HealthInfoPage