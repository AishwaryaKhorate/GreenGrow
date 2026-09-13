export default function Card({ children, className = '' }) {
  return (
    <div className={`bg-white rounded-xl2 border border-gray-100 shadow-card p-5 ${className}`}>
      {children}
    </div>
  )
}
