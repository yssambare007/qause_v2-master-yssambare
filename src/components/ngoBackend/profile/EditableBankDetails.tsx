import React from 'react'
import { useState } from 'react';
import { ACCOUNT_NUMBER, BANK_NAME, BENEFICIARY_NAME, BRANCH_LOCATION, IFSC_CODE_NUMBER } from '../../../constants/constants';

interface EditableBankDetailsProps {
    beneficiaryName: string;
    bankName: string;
    accountNumber: string;
    ifscCode: string;
    branchLocation: string;
    onSubmit?: (beneficiaryName: string, branchLocation: string, accountNumber: string, bankName: string, ifscCode: string) => void;
}

const EditableBankDetails = (props: EditableBankDetailsProps) => {
    const [beneficiaryName, setBeneficiaryName] = useState(props.beneficiaryName || 'John Doe');
    const [accountNumber, setAccountNumber] = useState(props.accountNumber || '24334544612');
    const [ifscCode, setIfscCode] = useState(props.ifscCode || 'XXXX000000');
    const [branchLocation, setBranchLocation] = useState(props.branchLocation || 'XYZ');
    const [bankName, setBankName] = useState(props.bankName || 'ABC');
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-40">
            <div className="my-3">
                <p className="text-[#767D89]">{BENEFICIARY_NAME}</p>
                <label htmlFor='beneficiaryName'></label>
                <input
                    id="beneficiaryName" placeholder={props.beneficiaryName || "John Doe"} type='text' value={beneficiaryName} onChange={(e) => setBeneficiaryName(e.target.value)} className="mb-2 border-2"
                />
            </div>
            <div className="my-3">
                <p className="text-[#767D89]">{BANK_NAME}</p>
                <input
                    id="bankName" placeholder={props.bankName || 'ABC'} type="text" value={props.bankName} onChange={(e) => setBankName(e.target.value)} className='mb-2 border-2'
                />
            </div>
            <div className="my-3 flex-auto">
                <p className="text-[#767D89]">{ACCOUNT_NUMBER}</p>
                <label htmlFor='accountNumber'></label>
                <div className='flex gap-1 items-center'>
                    <input
                        id="accountNumber" placeholder={props.accountNumber || '24334544612'} type="accountNumber" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} className='mb-2 border-2'
                    />
                </div>
            </div>
            <div className="my-3">
                <p className="text-[#767D89]">{IFSC_CODE_NUMBER}</p>
                <label htmlFor='ifscCode'></label>
                <div className='flex items-center gap-1'>
                    <input
                        id="ifscCode" placeholder={props.ifscCode || 'XXXX000000'} type="text" value={ifscCode} onChange={(e) => setIfscCode(e.target.value)} className='mb-2 border-2'
                    />
                </div>
            </div>
            <div className="my-3">
                <p className="text-[#767D89]">{BRANCH_LOCATION}</p>
                <label htmlFor='branchLocation'></label>
                <input
                    id="branchLocation" placeholder={props.branchLocation || 'XYZ'} type="text" value={branchLocation} onChange={(e) => setBranchLocation(e.target.value)} className='mb-2 border-2'
                />
            </div>
            <div className='mt-20 h-full'>
                <button onClick={() => { props.onSubmit && props.onSubmit(beneficiaryName, branchLocation, accountNumber, bankName, ifscCode) }}>Update General Details</button>
            </div>

        </div>
    )
}

export default EditableBankDetails
