import { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog'; 

import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';

import './styles/main.css';
import { CreateAdModal } from './components/CreateAdModal';

function App() {

  interface GameProps {
    id: string;
    bannerUrl: string;
    title: string;
    _count: {
      ads: number;
    }
  }

  const [games, setGames] = useState<GameProps[]>([]);

  useEffect(() => {
    fetch('http://localhost:3333/games')
      .then(response => response.json())
      .then(data => setGames(data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src="./src/assets/logo.svg" alt="" />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu <span className="bg-nlw-gradient bg-clip-text text-transparent">duo</span> está aqui.
      </h1>

      <div className="flex justify-center items-center gap-6 mt-16">
        {games.map((game) => (
          <GameBanner
            key={game.id}
            bannerUrl={game.bannerUrl}
            title={game.title}
            adsCount={game._count.ads}
          />
        ))}
      </div>

      <Dialog.Root>
        <CreateAdBanner />

        <CreateAdModal />
      </Dialog.Root>
    </div>
  )
}

export default App
