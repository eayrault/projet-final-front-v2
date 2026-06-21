import { Link } from "react-router-dom";

interface NavCardProps {
  to: string;
  title: string;
  description: string;
}

function NavCard({ to, title, description }: NavCardProps) {
  return (
    <Link to={to} className="no-underline text-inherit">
      <div className="bg-[#272535] p-8 rounded-xl shadow-lg transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-[#2B0071] hover:-translate-y-1">
        <h3 className="text-2xl mb-2 text-[#DDC01C] text-center">{title}</h3>
        <p className="text-[#9B9080] text-center leading-relaxed">
          {description}
        </p>
        <div className="mt-6 p-3 bg-[#A992E2] rounded-lg text-center text-sm text-[#1D1B26] font-semibold">
          GO
        </div>
      </div>
    </Link>
  );
}

export default NavCard;
