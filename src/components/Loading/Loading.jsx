import React from 'react'
import { RingLoader } from 'react-spinners'

export default function Loading() {
  return (
    <>
        <div className="loading">
            <RingLoader color="#2881d7"   size={90} />
        </div>
    </>
  )
}
