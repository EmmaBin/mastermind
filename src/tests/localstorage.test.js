import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import 'jest-localstorage-mock'
import ScoreBoard from '../components/ScoreBoard'

describe('ScoreBoard component', () => {
    beforeEach(() => {

        localStorage.clear()
        localStorage.setItem('4', '30')
        localStorage.setItem('5', '45')
        localStorage.setItem('6', '60')
    })

    afterEach(() => {

        localStorage.clear()
    })

    it('displays best performance from localStorage', () => {
        const { getByText } = render(<ScoreBoard />)

        expect(getByText('Easy: 30 seconds')).toBeInTheDocument()
        expect(getByText('Med: 45 seconds')).toBeInTheDocument()
        expect(getByText('Hard: 60 seconds')).toBeInTheDocument()
    })


})
