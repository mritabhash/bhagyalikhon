import { Link } from 'react-router-dom'
import { PalmArt } from '../components/palm'
import { buttonClass } from '../components/ui'
import { AlponaDivider } from '../components/ornaments'
import { cn } from '../lib/utils'

export default function NotFound() {
  return (
    <section className="container-page grid min-h-screen place-items-center pt-32 text-center">
      <div className="flex flex-col items-center">
        <PalmArt className="h-52 w-auto" />
        <p className="mt-6 font-sans text-sm font-semibold uppercase tracking-ritual text-sindoor">Page 404</p>
        <h1 className="mt-3 font-serif text-4xl text-heading sm:text-5xl">This line does not lead here</h1>
        <p className="mx-auto mt-4 max-w-md font-report text-ink-soft">
          The path you followed has faded from the page. Let the thread guide you back to where the reading begins.
        </p>
        <AlponaDivider className="my-8" />
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/" className={buttonClass('primary')}>Return Home</Link>
          <Link to="/sample" className={cn(buttonClass('secondary'))}>View Sample Report</Link>
        </div>
      </div>
    </section>
  )
}
