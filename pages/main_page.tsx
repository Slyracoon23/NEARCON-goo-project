import React from 'react'
import GlobalStyle from '../themes/GlobalStyle'
import Navbar from '../components/Navbar'
import Card from '../components/Card'
import SpaceDAOImage from '../assets/space_dao.jpg'
import AuroraImage from '../assets/aurora_dao.jpeg'
import BeatDAOImage from '../assets/beat_dao.jpeg'
import Image from 'next/image'

function MainPage() {
  return (
    <>
      <Navbar></Navbar>
      <h1 className="text-xl font-bold flex justify-center mt-10">
        Discover DAOs in the NEAR Ecosystem ⚖️
      </h1>
      <div className="mt-10 ml-12 mr-12 grid grid-cols-3 gap-20 flex justify-center">
        <div className="rounded overflow-hidden shadow-lg bg-white">
          <Image src={SpaceDAOImage} layout="responsive" />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2"></div>
            <h3 className="font-bold text-black">SpaceDAO</h3>
            <p className="text-gray-700 text-base">
              SpaceDAO is a vision to lower the barrier to entry for space
              travel.
            </p>
            <div>
              <button className="bg-blue-500 hover:bg-black-700 text-white font-bold py-2 px-4 rounded flex justify-center">
                Join now!
              </button>
            </div>
          </div>
        </div>
        <div className="rounded overflow-hidden shadow-lg bg-white">
          <Image src={AuroraImage} layout="responsive" />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2"></div>
            <h3 className="font-bold text-black">AuroraDAO</h3>
            <p className="text-gray-700 text-base">
              The AuroraDAO is responsible for governing the Aurora protocol.
            </p>
            <div>
              <button className="bg-blue-500 hover:bg-black-700 text-white font-bold py-2 px-4 rounded flex justify-center">
                Join now!
              </button>
            </div>
          </div>
        </div>
        <div className="rounded overflow-hidden shadow-lg bg-white">
          <Image src={BeatDAOImage} layout="responsive" />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2"></div>
            <h3 className="font-bold text-black">BeatDAO</h3>
            <p className="text-gray-700 text-base">
              The BeatDAO is a music producers collective on NEAR.
            </p>
            <div>
              <button className="bg-blue-500 hover:bg-black-700 text-white font-bold py-2 px-4 rounded flex justify-center">
                Join now!
              </button>
            </div>
          </div>
        </div>
      </div>
      <style jsx global>
        {GlobalStyle}
      </style>
    </>
  )
}

export default MainPage
