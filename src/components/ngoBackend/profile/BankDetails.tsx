import { useEffect, useState } from "react";
import EditableBankDetails from "./EditableBankDetails";
import EditableContainer from "./EditableContainer";
import NGOUploadDetails from "./UploadDetails";
import { ACCOUNT_NUMBER, BANK_NAME, BENEFICIARY_NAME, BRANCH_LOCATION, GENERAL_DETAILS, IFSC_CODE_NUMBER, NGO_ID, TOKEN, UPLOAD_DETAILS } from "../../../constants/constants";
import { useQuery } from "react-query";
import { USE_QUERY_KEYS } from "../../../constants/useQueryKeys";
import { fetchBankDetailsRequest } from "../../../utils/apis/bankAndKyc/Index";
import { base_url } from "../../../utils/utils";
import ResponseModal from "../../common/ResponseModal";
import { useRouter } from "next/router";
import Loader from "../../Loader";

interface BankDetailType {
    ticketId: string;
    name: string;
    ifsc: string;
    location: string;
    accountNumber: string;
    beneficiaryName: string;
    status: string;
    remarks: any;
}

function NGOBankDetails() {
    const router = useRouter();
    const [isEditingGeneralDetails, setIsEditingGeneralDetails] = useState(false);
    const [beneficiaryName, setBeneficiaryName] = useState('John Doe');
    const [bankName, setBankName] = useState('ABC');
    const [accountNumber, setAccountNumber] = useState('24334544612');
    const [branchLocation, setBranchLocation] = useState('XYZ');
    const [ifscCode, setIfscCode] = useState('XXXX000000');
    const [response, setResponse] = useState<string>("");
    const [responseModal, setResponseModal] = useState(false);
    
    const onSubmitGeneralDetails = (beneficiaryName: string, bankName: string, accountNumber: string, ifscCode: string, branchLocation: string): void => {
        setBeneficiaryName(beneficiaryName),
            setBankName(bankName);
        setAccountNumber(accountNumber);
        setIfscCode(ifscCode);
        setBranchLocation(branchLocation);

        const myHeaders = new Headers();
        myHeaders.append("Authorization", "" + localStorage.getItem(TOKEN));
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            accountNumber: accountNumber,
            ifsc: ifscCode,
            beneficiaryName: beneficiaryName,
            name: bankName,
            location: branchLocation,
            isUpdate: true,
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
        };
        const ngoId = localStorage.getItem(NGO_ID);
        fetch(base_url + "v2/ngo/" + ngoId + "/bank/details", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if(result.status) {
                    setResponse("Bank details has been added successfully.");
                    setResponseModal(true);
                    setIsEditingGeneralDetails(false);
                }
                else {
                    setResponse(result.error);
                    setResponseModal(true);
                    setIsEditingGeneralDetails(false);
                }
            })
            .catch((error) => {
                setResponse(error.data);
                setResponseModal(true);
                setIsEditingGeneralDetails(false);
            });
    };

    useEffect(() => {
        const token = localStorage.getItem("TOKEN");
        if (!token) router.push("/ngo-login");
    }, []);

    const { data, isLoading }: any = useQuery(USE_QUERY_KEYS.fetchBankDetails, async () => {
        const res = await fetchBankDetailsRequest();
        const bankDetails: BankDetailType = res["bank"];
        setBeneficiaryName(bankDetails.beneficiaryName);
        setBankName(bankDetails.name);
        setAccountNumber(bankDetails.accountNumber);
        setBranchLocation(bankDetails.location);
        setIfscCode(bankDetails.ifsc);
    });

    return (
        <div>
            <EditableContainer onEdit={() => (setIsEditingGeneralDetails((prevEditing) => !prevEditing))} editing={isEditingGeneralDetails} className="mt-12">
                <p className="font-extrabold text-[20px]">{GENERAL_DETAILS}</p>
                <>
                    {!isEditingGeneralDetails ?
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="my-3">
                                <p className="text-[14px] text-[#767D89]">{BENEFICIARY_NAME}</p>
                                <p className="text-[16px">{data?.bank?.beneficiaryName || beneficiaryName}</p>
                            </div>
                            <div className="my-3">
                                <p className="text-[14px] text-[#767D89]">{BANK_NAME}</p>
                                <p className="text-[16px">{data?.bank?.name || bankName}</p>
                            </div>
                            <div className="my-3">
                                <p className="text-[14px] text-[#767D89]">{ACCOUNT_NUMBER}</p>
                                <p className="text-[16px">{data?.bank?.accountNumber || accountNumber}</p>
                            </div>
                            <div className="my-3">
                                <p className="text-[14px] text-[#767D89]">{IFSC_CODE_NUMBER}</p>
                                <p className="text-[16px">{data?.bank?.ifsc || ifscCode}</p>
                            </div>

                            <div className="my-3">
                                <p className="text-[14px] text-[#767D89]">{BRANCH_LOCATION}</p>
                                <p className="text-[16px">{data?.bank?.location || branchLocation}</p>
                            </div>
                        </div> :
                        <>
                            <EditableBankDetails beneficiaryName={data?.bank?.beneficiaryName || beneficiaryName} ifscCode={data?.bank?.ifsc || ifscCode} accountNumber={data?.bank?.accountNumber || accountNumber} branchLocation={data?.bank?.location || branchLocation} bankName={data?.bank?.name || bankName} onSubmit={onSubmitGeneralDetails} />
                            <button onClick={() => (setIsEditingGeneralDetails((prevEditing) => !prevEditing))}>Cancel</button>
                        </>
                    }
                </>
            </EditableContainer>

            <div className="mt-12 px-8 pb-3 font-extrabold text-[24px">{UPLOAD_DETAILS}</div>
            <div className={"relative shadow-md rounded-lg border border-gray-300 md:px-8 sm:px-1 py-3 mb-5"} style={{
                minHeight: "206px"
            }}>
                <NGOUploadDetails kyc={false} />
            </div>
            <Loader isLoading={isLoading} />
            <ResponseModal
                open={responseModal}
                title={response}
                handleClose={() => setResponseModal(!responseModal)}
            ></ResponseModal>
        </div>
    );
}

export default NGOBankDetails;
