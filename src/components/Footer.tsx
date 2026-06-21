export default function Footer() {
  return (
    <footer className="bg-[#272535] text-[#FFF8E7] py-4">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Eliot AYRAULT</p>
      </div>
    </footer>
  );
}