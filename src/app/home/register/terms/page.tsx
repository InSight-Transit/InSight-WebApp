import NavHeader from "@/app/header";
import ButtonLinks from "@/app/components/ButtonLinks";


export default function registration() {
  return (
    <div className="bg-sky-700 min-h-screen w-full">
      <NavHeader/>
      <div className="flex flex-1 justify-center items-center">
        <h1 className="text-white text-[8vw] font-bold p-[5vw]">InSight</h1>
      </div>
      <div className="flex flex-1 justify-center items-center">
        <h2 className="text-white text-[3vw] font-bold pb-[4vw]">Please review the terms and agreements</h2>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="pb-[4vw] flex flex-1 justify-center items-center gap-[3vw] w-10/12"> 
          <div className="bg-white w-10/12 pb-[50vw]">
            <p className="flex flex-1 justify-center items-center">
              A Terms and Conditions agreement is where you let the public know the terms, rules and guidelines for using your website or mobile app. 
              They include topics such as acceptable use, restricted behavior and limitations of liability. <br></br>
              This article will get you started with creating your own custom Terms and Conditions agreement. We have also put together a Sample Terms 
              and Conditions Template that you can use to help you write your own.
            </p>
          </div>
        </div>
        <ButtonLinks
        agreeHref="/home/register/options"
        agreeLabel="Confirm"
        />
      </div>
    </div>
  );
}
