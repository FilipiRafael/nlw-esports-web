import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';

import './styles/main.css';

function App() {

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src="./src/assets/logo.svg" alt="" />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu <span className="bg-nlw-gradient bg-clip-text text-transparent">duo</span> está aqui.
      </h1>

      <div className="flex justify-center items-center gap-6 mt-16">
        <GameBanner
          bannerUrl='/image1.png'
          title='League of Legends'
          adsCount={6}
        />
      </div>

      <CreateAdBanner />
    </div>
  )
}

export default App
