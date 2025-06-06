/*
  ButtonLinks component
  This component is used to render a set of buttons for navigation.
*/

"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

interface ButtonLinksProps {
  /**
   * The back button is shown by default. and always navigates to the previous page.
   * Provide a non-empty string to customize the back button link.
   * If you want to hide the back button, set it to an empty string ('').
   */
  backHref?: string;

   /**
   * Set exitHref to an empty string ('') to hide the exit button.
   * Otherwise, the exit button will always navigate to the homepage ('/').
   */
   exitHref?: string;

   /**
    * The Next button is hidden by default.
    * Provide a non-empty string to show it.
    */
  agreeHref?: string;

    /** Custom label for the Next button. Defaults to "Next"
    * For example:
    *   <ButtonLinks
        agreeHref="/"
        agreeLabel="Confirm"  //without this prop, it will be "Next"
        />
    */
  agreeLabel?: string;
}

const ButtonLinks: React.FC<ButtonLinksProps> = ({ backHref, exitHref, agreeHref, agreeLabel }) => {
  const router = useRouter();
    const { t } = useTranslation("common");

  return (
    <div className="pt-[4vw] flex flex-1 justify-center items-center gap-[5vw] w-6/12">
      {backHref === '' ? null : (
        backHref ? (
          <Link href={backHref} className="w-full h-[6vw]">
            <button className="border-none text-[3vw] w-full h-full outline-none bg-white text-black font-semibold rounded-lg">
              {t("back")}
            </button>
          </Link>
        ) : (
          <button
            onClick={() => router.back()}
            className="border-none text-[3vw] w-full h-[6vw] outline-none bg-white text-black font-semibold rounded-lg"
          >
            {t("back")}
          </button>
        )
      )}


      {exitHref === '' ? null : (
        <Link href="/" className="w-full h-[6vw]">
          <button className="border-none text-[3vw] w-full h-full outline-none bg-white text-black font-semibold rounded-lg">
            {t("exit")}
          </button>
        </Link>
      )}

      {agreeHref ? (
        <Link href={agreeHref} className="w-full h-[6vw]">
          <button className="border-none text-[3vw] w-full h-full outline-none bg-white text-black font-semibold rounded-lg">
            {agreeLabel || 'Next'}
          </button>
        </Link>
      ) : null}
    </div>
  );
};

export default ButtonLinks;
