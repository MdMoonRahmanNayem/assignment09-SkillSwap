export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-10">
      <div className="max-w-6xl mx-auto px-4 py-6 grid md:grid-cols-3 gap-6">

        <div>
          <h2 className="text-lg font-semibold text-white">SkillSwap</h2>
          <p className="text-sm mt-2">A local skill exchange platform.</p>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-white">Contact</h2>
          <p className="text-sm mt-2">Email: support@skillswap.com</p>
          <p className="text-sm">Phone: +880 1234-567890</p>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-white">Follow Us</h2>
          <p className="text-sm mt-2 flex flex-col">
            <a className="hover:text-white" href="#">Facebook</a>
            <a className="hover:text-white" href="#">Instagram</a>
            <a className="hover:text-white" href="#">Privacy Policy</a>
          </p>
        </div>

      </div>

      <div className="text-center py-3 text-xs text-slate-500 border-t border-slate-700">
        © 2025 SkillSwap — All rights reserved.
      </div>
    </footer>
  )
}
