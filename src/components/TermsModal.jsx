import { useEffect, useRef, useState } from 'react'
import { X, ScrollText, ChevronsDown } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { TERMS } from '../data/terms'

// Pop-up that shows the Terms & Conditions.
// - "I Agree" stays disabled until the user scrolls to the bottom.
// - onAgree()  -> user accepted (parent ticks the checkbox)
// - onClose()  -> user closed / declined (checkbox stays unticked)
export default function TermsModal({ onAgree, onClose }) {
  const { t, language } = useLanguage()
  const content = TERMS[language] || TERMS.en

  const scrollRef = useRef(null)
  const [reachedEnd, setReachedEnd] = useState(false)

  function checkScroll() {
    const el = scrollRef.current
    if (!el) return
    // 8px tolerance for browser rounding
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 8) {
      setReachedEnd(true)
    }
  }

  // If the text is short enough to fit without scrolling, unlock immediately
  useEffect(() => {
    checkScroll()
  }, [language])

  // Esc closes the modal, and the page behind it stops scrolling
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="terms-title"
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full sm:max-w-lg max-h-[90vh] flex flex-col rounded-t-2xl sm:rounded-2xl shadow-2xl"
      >
        {/* HEADER */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
          <div className="w-10 h-10 rounded-xl bg-forest-100 flex items-center justify-center shrink-0">
            <ScrollText size={20} className="text-forest-700" />
          </div>

          <div className="flex-1 min-w-0">
            <h2 id="terms-title" className="text-lg font-bold text-gray-900">
              {t('terms.title')}
            </h2>
            <p className="text-xs text-gray-500">{content.updated}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label={t('terms.close')}
            className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* SCROLLABLE TEXT */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex-1 overflow-y-auto px-5 py-4 space-y-4"
        >
          {content.sections.map((section) => (
            <section key={section.title}>
              <h3 className="text-sm font-semibold text-gray-900">
                {section.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mt-1">
                {section.body}
              </p>
            </section>
          ))}
        </div>

        {/* FOOTER */}
        <div className="px-5 py-4 border-t border-gray-100">
          {!reachedEnd && (
            <p className="flex items-center justify-center gap-1.5 text-xs text-amber-600 mb-3">
              <ChevronsDown size={14} />
              {t('terms.scrollHint')}
            </p>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-11 border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold rounded-xl text-sm transition-colors"
            >
              {t('terms.decline')}
            </button>

            <button
              type="button"
              onClick={onAgree}
              disabled={!reachedEnd}
              className="flex-1 h-11 bg-forest-700 hover:bg-forest-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl text-sm transition-colors"
            >
              {t('terms.agree')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
