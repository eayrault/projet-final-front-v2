import { Link } from "react-router-dom";

interface NavCardProps {
  to: string;
  title: string;
  description: string;
}

function NavCard({ to, title, description }: NavCardProps) {
  return (
    <Link to={to} className="no-underline text-inherit">
      <div className="bg-[#2d2d2d] p-8 rounded-xl shadow-lg transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-[#646cff] hover:-translate-y-1">
        <h3 className="text-2xl mb-2 text-[#646cff] text-center">{title}</h3>
        <p className="text-[#888] text-center leading-relaxed">{description}</p>
        <div className="mt-6 p-3 bg-[#1a1a1a] rounded-lg text-center text-sm text-[#aaa]">
          GO
        </div>
      </div>
    </Link>
  );
}

export default NavCard;
