"use client";

import NavHeader from "@/app/header";
import ButtonLinks from "@/app/components/ButtonLinks";
import { useTranslation } from "react-i18next";


export default function Registration() {
  const { t } = useTranslation("common");

  return (
    <div className="bg-sky-700 min-h-screen w-full">
      <NavHeader hideLogout/>
      <div className="flex flex-1 justify-center items-center">
        <h1 className="text-white text-[8vw] font-bold p-[5vw]">InSight</h1>
      </div>
      <div className="flex flex-1 justify-center items-center">
        <h2 className="text-white text-[3vw] font-bold pb-[4vw]">{t("review")}</h2>
      </div>
      
      <div className="flex flex-col items-center justify-center">
        <div className="pb-[4vw] flex flex-1 justify-center items-center gap-[3vw] w-10/12"> 
          <div className="bg-white w-10/12 p-6 rounded-lg shadow-lg overflow-y-auto max-h-[60vh]">
          <p className="mb-4">
        Welcome to InSight! By accessing or using the InSight app, you agree to comply with and be bound by the following terms and conditions. Please read them carefully before using the service. If you do not agree to any part of these terms, please do not use the app.
      </p>
      <h3 className="font-bold mb-2">1. {t("acceptanceOfTerms")}</h3>
      <p className="mb-4">
        By using the InSight app, you agree to these Terms and Conditions, as well as our Privacy Policy. These terms apply to all users of the app.
      </p>
      <h3 className="font-bold mb-2">2. {t("useOfApp")}</h3>
      <p className="mb-4">
        You agree to use the app only for lawful purposes and in accordance with these terms. You must not use the app in any way that could damage, disable, or impair the app or interfere with other users&apos; access.
      </p>
      <h3 className="font-bold mb-2">3. {t("userAccounts")}</h3>
      <p className="mb-4">
        To access certain features of the app, you may be required to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
      </p>
      <h3 className="font-bold mb-2">4. {t("intellectualProperty")}</h3>
      <p className="mb-4">
        All content, features, and functionality of the InSight app, including but not limited to text, graphics, logos, and software, are the property of InSight and are protected by copyright, trademark, and other intellectual property laws.
      </p>
      <h3 className="font-bold mb-2">5. {t("limitationOfLiability")}</h3>
      <p className="mb-4">
        InSight is not responsible for any damages or losses resulting from your use of the app. The app is provided &quot;as is&quot; without any warranties of any kind.
      </p>
      <h3 className="font-bold mb-2">6. {t("changesToTerms")}</h3>
      <p className="mb-4">
        We reserve the right to modify these Terms and Conditions at any time. Any changes will be effective immediately upon posting. Your continued use of the app after changes are posted constitutes your acceptance of the revised terms.
      </p>
      <h3 className="font-bold mb-2">7. {t("termination")}</h3>
      <p className="mb-4">
        We may terminate or suspend your access to the app at any time, without prior notice, for any reason, including if you violate these terms.
      </p>
      <h3 className="font-bold mb-2">8. {t("governingLaw")}</h3>
      <p className="mb-4">
        These terms are governed by and construed in accordance with the laws of your jurisdiction. Any disputes arising from these terms will be resolved in the courts of your jurisdiction.
      </p>
      <h3 className="font-bold mb-2">9. {t("contactUs")}</h3>
      <p>
        If you have any questions about these Terms and Conditions, please contact us at support@insightapp.com.
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
