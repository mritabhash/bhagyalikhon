import type { ReadingInput } from '../lib/types'

// Fixed example data used to showcase the full depth of a Bhagyalikhon report.
export const SAMPLE_INPUT: ReadingInput = {
  fullName: 'Ananya Devi Roy',
  preferredName: 'Ananya',
  dob: '1994-03-21',
  gender: '',
  hand: 'both',
  palm: {
    lifeDepth: 'deep',
    lifeCurve: 'wide',
    headStyle: 'forked',
    heartStyle: 'chained',
    fate: 'clear',
    sun: 'faint',
    mercury: 'clear',
    shape: 'rectangular',
    fingerLength: 'long',
    thumb: 'firm',
    venus: 'full',
    jupiter: 'prominent',
    moon: 'prominent',
  },
  imageProvided: false,
  currentYear: new Date().getFullYear(),
}
