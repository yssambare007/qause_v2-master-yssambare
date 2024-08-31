function SignupModal(props: any) {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-[#c9cbcc] px-4">
      <div className="m-auto h-fit w-[490px] max-w-[490px] border-t-[6px] border-[#f5ad00] bg-[#fff] px-[20px] py-[20px] md:px-[80px] lg:px-[80px] xl:px-[80px]">
        {props.children}
      </div>
    </div>
  );
}

export default SignupModal;
