import Image from "next/image";
import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import OutsideClickHandler from "react-outside-click-handler";
import { useQuery } from "react-query";
import { AUDIT_REPORT, CANCELLED_CHEQUE, CERTIFICATES, NGO_ID, OTHER, PAN, REUPLOAD, TOKEN, TRUST_CERTIFICATE, UPLOAD_CANCELLED_CHEQUE, UPLOAD_CERTIFICATE, UPLOAD_PAN, UPLOAD_YOUR_12_A_CERTIFICATE, UPLOAD_YOUR_80G_CERTIFICATE, UPLOAD_YOUR_AUDIT_REPORT, UPLOAD_YOUR_FCRA_CERTIFICATE } from "../../../constants/constants";
import { USE_QUERY_KEYS } from "../../../constants/useQueryKeys";
import { fetchBankDetailsRequest } from "../../../utils/apis/bankAndKyc/Index";
import { base_url } from "../../../utils/utils";
import ResponseModal from "../../common/ResponseModal";
import Status from "../Status";
import { ResponseDocType } from "../../../services/types/models";
import Loader from "../../Loader";

interface KYCProps {
    kyc: boolean
}

const NGOUploadDetails = ({ kyc }: KYCProps) => {
    const [response, setResponse] = useState<string>("");
    const [responseModal, setResponseModal] = useState(false);
    const [trustCertificate, setTrustCertificate] = useState<File | null>(null);
    const [trustResponse, setTrustResponse] = useState<ResponseDocType | null>(null);

    const onChangeTrustCertificate = (e: any) => {
        uploadDocumentImage(
            e,
            "trust",
            trustResponse ? true : false,
            trustResponse?.ticketId
        );
        setTrustCertificate(e.target.files?.[0]);
    };

    const [panCertificate, setPanCertificate] = useState<File | null>(null);
    const [panCertificateResponse, setPanCertificateResponse] =
        useState<ResponseDocType | null>(null);

    const onChangePanCertificate = (e: any) => {
        uploadDocumentImage(
            e,
            "pancard",
            panCertificateResponse ? true : false,
            panCertificateResponse?.ticketId
        );
        setPanCertificate(e.target.files?.[0]);
    };

    const [twelveACertificate, setTwelveACertificate] = useState<File | null>(null);
    const [twelveAResponse, setTwelveAResponse] = useState<ResponseDocType | null>(null);


    const onChangeTwelveACertificate = (e: any) => {
        uploadDocumentImage(
            e,
            "12a",
            twelveAResponse ? true : false,
            twelveAResponse?.ticketId
        );
        setTwelveACertificate(e.target.files?.[0]);
    };

    const [fcraCertificate, setFcraCertificate] = useState<File | null>(null);
    const [fcraResponse, setFcraResponse] = useState<ResponseDocType | null>(
        null
    );

    const onChangeFcraCertificate = (e: any) => {
        uploadDocumentImage(
            e,
            "fcra",
            fcraResponse ? true : false,
            fcraResponse?.ticketId
        );
        setFcraCertificate(e.target.files?.[0]);
    };

    const [eightyGCertificate, setEightyGCertificate] = useState<File | null>(null);
    const [eigthyGResponse, setEightyGResponse] = useState<ResponseDocType | null>(null);


    const onChangeEightyGCertificate = (e: any) => {
        uploadDocumentImage(
            e,
            "80g",
            eigthyGResponse ? true : false,
            eigthyGResponse?.ticketId
        );
        setEightyGCertificate(e.target.files?.[0]);
    };

    const [auditReport, setAuditReport] = useState<File | null>(null);
    const [auditResponse, setAuditResponse] = useState<ResponseDocType | null>(
        null
    );

    const onChangeAuditReport = (e: any) => {
        uploadDocumentImage(
            e,
            "audit",
            auditResponse ? true : false,
            auditResponse?.ticketId
        );
        setAuditReport(e.target.files?.[0]);
    };

    const [cancelledCheque, setCancelledCheque] = useState<File | null>(null);
    const [cancelledResponse, setCancelledResponse] =
        useState<ResponseDocType | null>(null);

    const onChangeCancelledCheque = (e: any) => {
        uploadDocumentImage(
            e,
            "cancel cheque",
            cancelledResponse ? true : false,
            cancelledResponse?.ticketId
        );
        setCancelledCheque(e.target.files?.[0]);
    };

    const [otherCertificate, setOtherCertificate] = useState<File | null>(null);
    const [otherCertificateResponse, setOtherCertificateResponse] = useState<ResponseDocType | null>(null);

    const onChangeOtherCertificate = (e: any) => {
        uploadDocumentImage(
            e,
            "other",
            otherCertificateResponse ? true : false,
            otherCertificateResponse?.ticketId
        );
        setOtherCertificate(e.target.files?.[0]);
    };

    const currentYear = new Date().getFullYear();
    const yearOptions = [];

    for (let i = 1900; i <= currentYear; i++) {
        yearOptions.push(
            <option key={i} value={i}>
                {i}
            </option>
        );
    }

    const [year, setYear] = useState("Select Year");
    const [isYearDropdownOpen, setIsYearDropDownOpen] = useState(false);

    const [isBannerOpen, setIsBannerOpen] = useState(true);

    const uploadDocumentImage = (
        e: any,
        docType: string,
        replace = false,
        ticketId?: string
    ) => {
        const ngoId = localStorage.getItem(NGO_ID);

        const myHeaders = new Headers();
        myHeaders.append("Authorization", "" + localStorage.getItem(TOKEN));
        const fileInput = e.target?.files?.[0];
        const formdata = new FormData();
        formdata.append("file", fileInput);
        formdata.append("documentType", docType);

        if (replace) {
            formdata.append("isUpdate", "" + replace);
            formdata.append("ticketId", ticketId ?? "");
        }

        if (docType) {
            formdata.append("auditYear", year === "Select Year" ? "" : year);
        }

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
        };

        fetch(base_url + "v2/ngo/" + ngoId + "/kyc/file", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setResponse("File Uploaded Successfully");
                setResponseModal(!responseModal);
            })
            .catch((error) => {
                setResponse("Upload Failed");
                setResponseModal(!responseModal);
            });
    };
    const [resolvedDocs, setResolvedDoc] = useState<string[]>([]);
    const [pendingDocs, setPendingDoc] = useState<string[]>([]);
    const [rejectedDocs, setRejectedDoc] = useState<string[]>([]);

    const filterDoc = (name: string, status: string) => {
        switch (status) {
            case "rejected": {
                setRejectedDoc((doc) => [...doc, name]);
                break;
            }
            case "resolved": {
                setResolvedDoc((doc) => [...doc, name]);
                break;
            }
            case "pending": {
                setPendingDoc((doc) => [...doc, name]);
            }
        }
    };

    const onClickImage = async (imageLink: string) => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "" + localStorage.getItem(TOKEN));
        myHeaders.append("Content-Type", "application/json");

        const key = imageLink.split("/").slice(4).join("/");
        const raw = JSON.stringify({
            key: key,
        });

        const fileName = key.split("/")[key.split('/').length - 1];
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
        };
        fetch(base_url + "v2/ngo/file", requestOptions)
            .then(async (response) => {
                response.arrayBuffer().then(function (buffer) {
                    const url = window.URL.createObjectURL(new Blob([buffer]));
                    const link = document.createElement("a");
                    link.href = url;
                    link.setAttribute("download", fileName ?? "no_image.png"); //or any other extension
                    document.body.appendChild(link);
                    link.click();
                });
            })
            .catch((error: any) => {});

    };

    const { data, isLoading } = useQuery(USE_QUERY_KEYS.fetchBankDetails, async () => {
        const res = await fetchBankDetailsRequest();

        const a12 = res["a12"];
        setTwelveAResponse(a12 ?? null);

        const pancard = res["pancard"];
        setPanCertificateResponse(pancard ?? null);

        const g80 = res["g80"];
        setEightyGResponse(g80 ?? null);

        const fcra = res["fcra"];
        setFcraResponse(fcra ?? null);

        const cancelCheque = res["cancelCheque"];
        setCancelledResponse(cancelCheque ?? null);

        const trust = res["trust"];
        setTrustResponse(trust ?? null);

        const otherCertificate = res["otherCertificate"];
        setOtherCertificateResponse(otherCertificate ?? null);

        setRejectedDoc([]);
        setResolvedDoc([]);
        setPendingDoc([]);

        filterDoc("12 A Certificate", a12?.status ?? "");
        filterDoc("Pan", pancard?.status ?? "");
        filterDoc("80G Certificate", g80?.status ?? "");
        filterDoc("FCRA Certificate", fcra?.status ?? "");
        filterDoc("Cancelled Cheque", cancelCheque?.status ?? "");
        filterDoc("Trust Certificate", trust?.status ?? "");
        filterDoc("Other Certificate", otherCertificate?.status ?? "");

        return res;
    });

    const downloadAll = async () => {
        const details = Object.values(data);

        details.forEach((detail: any) => {
            if (detail?.fileLocation) {
                onClickImage(detail?.fileLocation);
            }
        });

    };

    function handleOutSideClick() {
        setIsYearDropDownOpen(false);
    }

    function handleYearDropDownClick() {
        setIsYearDropDownOpen(true);
    }

    function toggleBanner() {
        setIsBannerOpen(!isBannerOpen);
    }

    function toggleResponseModal() {
        setResponseModal(!responseModal);
    }

    return (
        <div className="relative xs:ml-[15px] sm:ml-[15px] md:ml-[30px] mt-5">
            {/* Information Fields  */}
            {/* Trust Certificate  */}
            <div className='w-full'>
                <div className='flex items-center mb-4'>
                    <Image src='/images/gallery-icon.png' className='w-[21px] h-[21px]' alt='gallery icon' height='21' width='21' />
                    <p className='text-[20px] font-medium ml-3'>{TRUST_CERTIFICATE}*</p>
                </div>

                <div className='flex flex-col gap-6'>
                    <div className={`flex items-center justify-between border-t border-b border-r border-l rounded-lg ${trustResponse?.status === "rejected" && 'bg-[#EDEDED]'} border-[#C7C7C7] min-h-[53px] px-[15px] xs:w-[96%] sm:w-[96%] lg:w-[46%] xl:w-[100%]`}>
                        <p>{UPLOAD_CERTIFICATE}</p>
                        <label htmlFor='panCertificateImage'>
                            {
                                (!trustResponse || (trustResponse && trustResponse.status === 'pending')) && (
                                    <Image className='cursor-pointer' src='/images/upload-icon.png' height='24' width='24' alt='upload icon' />
                                )
                            }
                            {
                                trustResponse && trustResponse.status === "rejected" && (
                                    <p className='cursor-pointer text-[#FFFFFF] bg-[#002DC9] px-[16px] py-[8px] rounded-md'>
                                        {REUPLOAD}
                                    </p>
                                )
                            }


                        </label>
                        <input className='hidden' type='file' id='panCertificateImage' onChange={onChangeTrustCertificate} />
                    </div>

                    {trustCertificate !== null && (
                        <Status
                            text={"pending"}
                            file={trustCertificate}
                            setFile={setTrustCertificate}
                        />
                    )}
                    {trustCertificate === null && trustResponse !== null && (
                        <Status
                            text={trustResponse?.status ?? ""}
                            imageLink={trustResponse?.fileLocation ?? ""}
                            onClickImage={onClickImage}
                        />
                    )}
                </div>
            </div>

            <div className="mt-6 mb-5 h-[2px] w-full bg-[#E2E7FF]"></div>

            {/* Pan  */}
            <div className='w-full'>
                <div className='flex items-center mb-4'>
                    <Image src='/images/calender-icon.png' className='w-[21px] h-[21px]' alt='gallery icon' height='21' width='21' />
                    <p className='text-[20px] font-medium ml-3'>{PAN}*</p>
                </div>

                <div className='flex flex-col gap-6'>
                    <div className={`flex items-center justify-between border-t border-b border-r border-l rounded-lg ${panCertificateResponse?.status === 'rejected' && 'bg-[#EDEDED]'} border-[#C7C7C7] min-h-[53px] px-[15px] xs:w-[96%] sm:w-[96%] lg:w-[46%] xl:w-[100%]`}>
                        <p>{UPLOAD_PAN}</p>
                        <label htmlFor='trustCertificateImage'>
                            {
                                (!panCertificateResponse || (panCertificateResponse && panCertificateResponse.status === 'pending')) &&
                                (
                                    <Image className='cursor-pointer' src='/images/upload-icon.png' height='24' width='24' alt='upload icon' />
                                )
                            }
                            {
                                panCertificateResponse && panCertificateResponse.status === "rejected" &&
                                (
                                    <p className='cursor-pointer text-[#FFFFFF] bg-[#002DC9] px-[16px] py-[8px] rounded-md'>
                                        {REUPLOAD}
                                    </p>
                                )
                            }
                        </label>

                        <input className='hidden' type='file' id='trustCertificateImage' onChange={onChangePanCertificate} />

                    </div>

                    {panCertificate !== null && (
                        <Status
                            text='pending'
                            icon1='x-circle.png'
                            icon2='approved-left-tick.png'
                            textColor='#36B933'
                            bgColor='#36B9331F'
                            file={panCertificate}
                            setFile={setPanCertificate}
                        />
                    )}
                    {panCertificate === null && panCertificateResponse !== null && (
                        <Status
                            text={panCertificateResponse.status}
                            imageLink={panCertificateResponse.fileLocation}
                            onClickImage={onClickImage}
                        />
                    )}
                </div>
            </div>

            <div className="mt-6 mb-5 h-[2.5px] w-full bg-[#E2E7FF]"></div>

            {/* Certificate  */}
            <div className='w-full'>
                <div className='flex items-center mb-4'>
                    <Image src='/images/gallery-icon.png' className='w-[21px] h-[21px]' alt='gallery icon' height='21' width='21' />
                    <p className='text-[20px] font-medium ml-3'>{CERTIFICATES}*</p>
                </div>

                <div className='flex flex-col gap-6'>
                    <div className={`flex min-h-[53px] items-center justify-between ${twelveAResponse?.status === 'rejected' && 'bg-[#EDEDED]'} border border-[#C7C7C7] rounded-lg px-[15px] xs:w-[96%] sm:w-[96%] lg:w-[46%] xl:w-[100%]`}>
                        <p>{UPLOAD_YOUR_12_A_CERTIFICATE}</p>
                        <label htmlFor="twelveACertifite">
                            {(!twelveAResponse || (twelveAResponse && twelveAResponse.status === 'pending')) && (
                                <Image
                                    className="cursor-pointer"
                                    src="/images/upload-icon.png"
                                    height="24"
                                    width="24"
                                    alt="upload icon"
                                />
                            )}
                            {twelveAResponse &&
                                twelveAResponse.status === "rejected" && (
                                    <p className="cursor-pointer rounded-md bg-[#002DC9] px-[16px] py-[8px] text-[#FFFFFF]">
                                        {REUPLOAD}
                                    </p>
                                )}
                        </label>

                        <input
                            className="hidden"
                            type="file"
                            id="twelveACertifite"
                            onChange={onChangeTwelveACertificate}
                        />
                    </div>

                    {twelveACertificate !== null && (
                        <Status
                            text="pending"
                            icon1="x-circle.png"
                            icon2="error-left.png"
                            textColor="#F60D0D"
                            bgColor="#F60D0D1F"
                            file={twelveACertificate}
                            setFile={setTwelveACertificate}
                        />
                    )}

                    {twelveACertificate === null && twelveAResponse !== null && (
                        <Status
                            text={twelveAResponse.status}
                            imageLink={twelveAResponse.fileLocation}
                            onClickImage={onClickImage}
                        />
                    )}

                    <div className={`flex min-h-[53px] items-center justify-between rounded-lg border-t border-b border-r border-l ${fcraResponse?.status === 'rejected' && 'bg-[#EDEDED]'} border-[#C7C7C7] px-[15px] xs:w-[96%] sm:w-[96%] lg:w-[46%] xl:w-[100%]`}>
                        <p>{UPLOAD_YOUR_FCRA_CERTIFICATE}</p>
                        <label htmlFor="fcraCertificate">
                            {(!fcraResponse || (fcraResponse && fcraResponse.status === 'pending')) && (
                                <Image
                                    className="cursor-pointer"
                                    src="/images/upload-icon.png"
                                    height="24"
                                    width="24"
                                    alt="upload icon"
                                />
                            )}
                            {fcraResponse && fcraResponse.status === "rejected" && (
                                <p className="cursor-pointer rounded-md bg-[#002DC9] px-[16px] py-[8px] text-[#FFFFFF]">
                                    {REUPLOAD}
                                </p>
                            )}
                        </label>
                        <input
                            className="hidden"
                            type="file"
                            id="fcraCertificate"
                            onChange={onChangeFcraCertificate}
                        />
                    </div>

                    {fcraCertificate !== null && (
                        <Status
                            text="pending"
                            icon1="x-circle.png"
                            icon2="approved-left-tick.png"
                            textColor="#36B933"
                            bgColor="#36B9331F"
                            file={fcraCertificate}
                            setFile={setPanCertificate}
                        />
                    )}
                    {fcraCertificate === null && fcraResponse !== null && (
                        <Status
                            text={fcraResponse.status}
                            imageLink={fcraResponse.fileLocation}
                            onClickImage={onClickImage}
                        />
                    )}

                    <div className={`flex min-h-[53px] items-center justify-between rounded-lg border-t border-b border-r border-l ${eigthyGResponse?.status === 'rejected' && 'bg-[#EDEDED]'} border-[#C7C7C7] px-[15px] xs:w-[96%] sm:w-[96%] lg:w-[46%] xl:w-[100%]`}>
                        <p>{UPLOAD_YOUR_80G_CERTIFICATE}</p>
                        <label htmlFor="80G-certificate">
                            {(!eigthyGResponse || (eigthyGResponse && eigthyGResponse.status === 'pending')) && (
                                <Image
                                    className="cursor-pointer"
                                    src="/images/upload-icon.png"
                                    height="24"
                                    width="24"
                                    alt="upload icon"
                                />
                            )}
                            {eigthyGResponse &&
                                eigthyGResponse.status === "rejected" && (
                                    <p className="cursor-pointer rounded-md bg-[#002DC9] px-[16px] py-[8px] text-[#FFFFFF]">
                                        {REUPLOAD}
                                    </p>
                                )}
                        </label>
                        <input
                            className="hidden"
                            type="file"
                            id="80G-certificate"
                            onChange={onChangeEightyGCertificate}
                        />
                    </div>

                    {eightyGCertificate !== null && (
                        <Status
                            text="pending"
                            icon1="x-circle.png"
                            icon2="approved-left-tick.png"
                            textColor="#36B933"
                            bgColor="#36B9331F"
                            file={eightyGCertificate}
                            setFile={setEightyGCertificate}
                        />
                    )}
                    {eightyGCertificate === null && eigthyGResponse !== null && (
                        <Status
                            text={eigthyGResponse.status}
                            imageLink={eigthyGResponse.fileLocation}
                            onClickImage={onClickImage}
                        />
                    )}
                </div>
            </div>


            {/* Audit Report  */}
            {
                kyc ?
                    <div>
                        <div className="mt-10 mb-12 h-[2.5px] w-full bg-[#E2E7FF]"></div>

                        <div className='w-full'>
                            <div className='flex items-center mb-4'>
                                <Image src='/images/switch-icon.png' className='w-[21px] h-[21px]' alt='gallery icon' height='21' width='21' />
                                <p className='text-[20px] font-medium ml-3'>{AUDIT_REPORT}</p>
                            </div>

                            <div className='flex flex-col gap-6'>
                                <div className='flex xs:flex-col sm:flex-col lg:flex-row'>
                                    <div className={`flex items-center justify-between border-t border-b border-r border-l rounded-lg ${auditResponse?.status === 'rejected' && 'bg-[#EDEDED]'} border-[#C7C7C7] min-h-[53px] px-[15px] xs:w-[96%] sm:w-[96%] lg:w-[47%]`}>
                                        <p>{UPLOAD_YOUR_AUDIT_REPORT}</p>
                                        <label htmlFor='auditReport'>
                                            {
                                                (!auditResponse || (auditResponse && auditResponse.status === 'pending')) &&
                                                (
                                                    <Image className='cursor-pointer' src='/images/upload-icon.png' height='24' width='24' alt='upload icon' />
                                                )

                                            }
                                            {
                                                auditResponse && auditResponse.status === "rejected" &&
                                                (
                                                    <p className='cursor-pointer text-[#FFFFFF] bg-[#002DC9] px-[16px] py-[8px] rounded-md'>
                                                        {REUPLOAD}
                                                    </p>
                                                )
                                            }
                                        </label>
                                        <input className='hidden' type='file' id='auditReport' onChange={onChangeAuditReport} />
                                    </div>

                                    <OutsideClickHandler onOutsideClick={() => setIsYearDropDownOpen(false)}>
                                        <div className='relative w-fit'>
                                            <div className='cursor-pointer flex items-center justify-center px-4 py-2 bg-[#F0F0F0] h-[53px] rounded-md lg:ml-3'>
                                                <p className='text-[#727272]'>{year}</p>
                                                <KeyboardArrowDownIcon style={{ color: '#727272' }} onClick={() => setIsYearDropDownOpen(true)} />
                                            </div>

                                            {isYearDropdownOpen && (
                                                <div className='absolute top-[60px] lg:left-3 z-50 max-h-[100px] xs:w-full sm:w-full lg:w-[93%] overflow-scroll overflow-x-hidden border bg-[#fff]'>
                                                    {yearOptions.map((ye: any, index: number) => {
                                                        return (
                                                            <div
                                                                className="cursor-pointer py-1 pl-4 text-[15px] font-normal hover:bg-[#eaeaea]"
                                                                key={index}
                                                                onClick={() => {
                                                                    setYear((ye.key - 1) + '-' + ye.key);
                                                                    setIsYearDropDownOpen(false);
                                                                }}
                                                            >
                                                                {ye.key - 1} - {ye.key}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                    </OutsideClickHandler>
                                </div>

                                {auditReport !== null && (
                                    <Status
                                        text='pending'
                                        file={auditReport}
                                        setFile={setAuditReport}
                                    />
                                )}
                                {auditReport === null && auditResponse !== null && (
                                    <Status
                                        text={auditResponse.status}
                                        imageLink={auditResponse.fileLocation}
                                        onClickImage={onClickImage}
                                    />
                                )}
                            </div>
                        </div>
                    </div> : ""
            }


            <div className="mt-10 mb-12 h-[2.5px] w-full bg-[#E2E7FF]"></div>

            {/* Cancelled Cheque  */}
            <div className='w-full mt-12'>
                <div className='flex items-center mb-4'>
                    <Image src='/images/gallery-icon.png' className='w-[21px] h-[21px]' alt='gallery icon' height='21' width='21' />
                    <p className='text-[20px] font-medium ml-3'>{CANCELLED_CHEQUE}</p>
                </div>

                <div className='flex flex-col gap-6'>
                    <div className={`flex items-center justify-between border-t border-b border-r border-l rounded-lg ${cancelledResponse?.status === 'rejected' && 'bg-[#EDEDED]'} border-[#C7C7C7] min-h-[53px] px-[15px] xs:w-[96%] sm:w-[96%] lg:w-[46%]`}>
                        <p>{UPLOAD_CANCELLED_CHEQUE}</p>
                        <label htmlFor='cancelled-cheque'>
                            {
                                (!cancelledResponse || (cancelledResponse && cancelledResponse.status === 'pending')) &&
                                (
                                    <Image className='cursor-pointer' src='/images/upload-icon.png' height='24' width='24' alt='upload icon' />
                                )

                            }
                            {
                                cancelledResponse && cancelledResponse.status === "rejected" &&
                                (
                                    <p className='cursor-pointer text-[#FFFFFF] bg-[#002DC9] px-[16px] py-[8px] rounded-md'>
                                        {REUPLOAD}
                                    </p>
                                )
                            }
                        </label>
                        <input className='hidden' type='file' id='cancelled-cheque' onChange={onChangeCancelledCheque} />
                    </div>

                    {cancelledCheque !== null && (
                        <Status
                            text='pending'
                            icon1='x-circle.png'
                            icon2='orange-icon.png'
                            textColor='#FF8515'
                            bgColor='#FFB1151F'
                            file={cancelledCheque}
                            setFile={setCancelledCheque}
                        />
                    )}
                    {cancelledCheque === null && cancelledResponse !== null && (
                        <Status
                            text={cancelledResponse.status}
                            imageLink={cancelledResponse.fileLocation}
                            onClickImage={onClickImage}
                        />
                    )}
                </div>
            </div>


            {
                !kyc ?
                    <div>
                        <div className="mt-10 mb-12 h-[2.5px] w-full bg-[#E2E7FF]"></div>
                        <div className='w-full'>
                            <div className='flex items-center mb-4'>
                                <Image src='/images/calender-icon.png' className='w-[21px] h-[21px]' alt='gallery icon' height='21' width='21' />
                                <p className='text-[20px] font-medium ml-3'>{OTHER}</p>
                            </div>

                            <div className='flex flex-col gap-6'>
                                <div className={`flex items-center justify-between border-t border-b border-r border-l rounded-lg ${otherCertificateResponse?.status === 'rejected' && 'bg-[#EDEDED]'} border-[#C7C7C7] min-h-[53px] px-[15px] xs:w-[96%] sm:w-[96%] lg:w-[46%]`}>
                                    <p>{UPLOAD_CERTIFICATE}</p>
                                    <label htmlFor='trustCertificateImage'>
                                        {
                                            (!otherCertificateResponse || (otherCertificateResponse && otherCertificateResponse.status === 'pending')) &&
                                            (
                                                <Image className='cursor-pointer' src='/images/upload-icon.png' height='24' width='24' alt='upload icon' />
                                            )
                                        }
                                        {
                                            otherCertificateResponse && otherCertificateResponse.status === "rejected" &&
                                            (
                                                <p className='cursor-pointer text-[#FFFFFF] bg-[#002DC9] px-[16px] py-[8px] rounded-md'>
                                                    {REUPLOAD}
                                                </p>
                                            )
                                        }
                                    </label>

                                    <input className='hidden' type='file' id='trustCertificateImage' onChange={onChangeOtherCertificate} />

                                </div>

                                {otherCertificate !== null && (
                                    <Status
                                        text='pending'
                                        icon1='x-circle.png'
                                        icon2='approved-left-tick.png'
                                        textColor='#36B933'
                                        bgColor='#36B9331F'
                                        file={otherCertificate}
                                        setFile={setOtherCertificate}
                                    />
                                )}
                                {otherCertificate === null && otherCertificateResponse !== null && (
                                    <Status
                                        text={otherCertificateResponse.status}
                                        imageLink={otherCertificateResponse.fileLocation}
                                        onClickImage={onClickImage}
                                    />
                                )}
                            </div>
                        </div>
                    </div> : ""
            }
            <Loader isLoading={isLoading} />
            <ResponseModal
                open={responseModal}
                title={response}
                handleClose={toggleResponseModal}
            />
        </div>
    )
}

export default NGOUploadDetails;