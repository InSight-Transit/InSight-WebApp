// components/ButtonLinks.tsx
import Link from 'next/link';

interface ButtonLinksProps {
  backHref?: string;  
  exitHref?: string;  
  agreeHref?: string; 
}

const ButtonLinks: React.FC<ButtonLinksProps> = ({ backHref, exitHref, agreeHref }) => {
  return (
    <div className="pt-[4vw] flex flex-1 justify-center items-center gap-[5vw] w-6/12">
      <Link href={backHref || `../.`} className={`w-full h-[6vw] ${!backHref ? 'invisible' : ''}`}>
        <button className="border-none text-[3vw] w-full h-full outline-none bg-white text-black font-semibold rounded-lg">
          Back
        </button>
      </Link>
      <Link href={exitHref || `/`} className={`w-full h-[6vw] ${!exitHref ? 'invisible' : ''}`}>
        <button className="border-none text-[3vw] w-full h-full outline-none bg-white text-black font-semibold rounded-lg">
          Exit
        </button>
      </Link>
      <Link href={agreeHref || `/`} className={`w-full h-[6vw] ${!agreeHref ? 'invisible' : ''}`}>
        <button className="border-none text-[3vw] w-full h-full outline-none bg-white text-black font-semibold rounded-lg">
          Agree
        </button>
      </Link>
    </div>
  );
};

export default ButtonLinks;
