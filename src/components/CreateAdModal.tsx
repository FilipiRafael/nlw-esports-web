import { useState, useEffect, FormEvent } from 'react';

import axios from 'axios';

import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as ToggleGroup from '@radix-ui/react-toggle-group';

import { GameController, Check } from "phosphor-react";
import { Input } from "./Form/input";

interface Game {
    id: string;
    title: string;
}

export function CreateAdModal() {

    const [games, setGames] = useState<Game[]>([]);
    const [weekDays, setWeekDays] = useState<string[]>([])
    const [useVoiceChannel, setUseVoiceChannel] = useState(false);

    const handleCreateAd = async (event: FormEvent) => {
      event.preventDefault();

      const formData = new FormData(event.target as HTMLFormElement);
      const data = Object.fromEntries(formData);

      if (!data.name) {
        return;
      }

      try {
        axios.post(`http://localhost:3333/games/${data.game}/ads`, {
          "name": data.name,
          "yearsPlaying": Number(data.yearsPlaying),
          "discord": data.discord,
          "weekDays": weekDays.map(Number),
          "hourStart": data.hourStart,
          "hourEnd": data.hourEnd,
          "useVoiceChannel": useVoiceChannel
        })

        alert('Anúncio criado com sucesso!');
      } catch (err) {
        console.error(err);
        alert('Erro ao criar o anúncio');
      }
    };

    useEffect(() => {
      axios('http://localhost:3333/games')
        .then(response => setGames(response.data));
    }, []);

    return (
        <Dialog.Portal>
          <Dialog.Overlay
            className="bg-black/60 inset-0 fixed"
          />
          <Dialog.Content
            className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-black/25"
          >
            <Dialog.Title
              className="text-3xl text-white font-black"
            >
              Publique um anúncio
            </Dialog.Title>

            <form onSubmit={handleCreateAd} className='mt-8 flex flex-col gap-4'>
              <div className='flex flex-col gap-2'>
                <label htmlFor="game" className="font-semibold">Qual o game?</label>
                <select
                  id="game"
                  className='bg-zinc-900 py-3 px-4 rounded outline-none text-sm placeholder:text-zinc-500 appearance-none'
                  defaultValue=''
                  name='game'
                >
                    <option disabled value=''>Selecione o game que deseja jogar</option>
                    {games.map((game) => {
                        return  <option key={game.id} value={game.id}>{game.title}</option>
                    })}
                </select>
              </div>

              <div className='flex flex-col gap-2'>
                <label htmlFor="name">Seu nome (ou nickname)</label>
                <Input placeholder="Como te chamam dentro do game?" id="name" name='name' />
              </div>

              <div className='grid grid-cols-2 gap-6'>
                <div className='flex flex-col gap-2'>
                  <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                  <Input type="number" id="yearsPlaying" name='yearsPlaying' placeholder="Tudo bem ser ZERO" />
                </div>
                <div className='flex flex-col gap-2'>
                  <label htmlFor="discord">Qual seu Discord?</label>
                  <Input type="text" id="discord" name='discord' placeholder="Usuário#000" />
                </div>
              </div>

              <div className="flex gap-6">
                <div className='flex flex-col gap-2'>
                  <label htmlFor="weekDays">Quando costuma jogar?</label>
                  <ToggleGroup.Root
                    type="multiple"
                    className='grid grid-cols-4 gap-2'
                    onValueChange={setWeekDays}
                    value={weekDays}
                  >
                    <ToggleGroup.Item
                      value='0'
                      title="Domingo"
                      className={`w-8 h-8 rounded-sm ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                    >
                      D
                    </ToggleGroup.Item
                    >
                    <ToggleGroup.Item
                      title="Segunda-feira"
                      className={`w-8 h-8 rounded-sm ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                      value='1'
                    >
                      S
                    </ToggleGroup.Item
                    >
                    <ToggleGroup.Item
                      title="Terça-feira"
                      className={`w-8 h-8 rounded-sm ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                      value='2'
                    >
                      T
                    </ToggleGroup.Item
                    >
                    <ToggleGroup.Item
                      title="Quarta-feira"
                      className={`w-8 h-8 rounded-sm ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                      value='3'
                    >
                      Q
                    </ToggleGroup.Item
                    >
                    <ToggleGroup.Item
                      title="Quinta-feira"
                      className={`w-8 h-8 rounded-sm ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                      value='4'
                    >
                      Q
                    </ToggleGroup.Item
                    >
                    <ToggleGroup.Item
                      title="Sexta-feira"
                      className={`w-8 h-8 rounded-sm ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                      value='5'
                    >
                      S
                    </ToggleGroup.Item
                    >
                    <ToggleGroup.Item
                      title="Sábaso"
                      className={`w-8 h-8 rounded-sm ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                      value='6'
                    >
                      S
                    </ToggleGroup.Item>
                  </ToggleGroup.Root>
                </div>
                <div className='flex flex-col gap-2 flex-1'>
                  <label htmlFor="hourStart">Qual horário do dia?</label>
                  <div className='grid grid-cols-2 gap-2'>
                    <Input type="time" placeholder='De' id="hourStart" name='hourStart' />
                    <Input type="time" placeholder='Até' id="hourEnd" name='hourEnd' />
                  </div>
                </div>
              </div>

              <div className='mt-2 flex gap-2 text-sm'>
                <Checkbox.Root
                  checked={useVoiceChannel}
                  className='w-6 h-6 rounded bg-zinc-900 flex justify-center items-center'
                  id='voiceChannel'
                  onCheckedChange={(checked) => {
                    if (checked === true) {
                      setUseVoiceChannel(true);
                    } else {
                      setUseVoiceChannel(false);
                    }
                  }}
                >
                    <Checkbox.Indicator>
                        <Check
                            className='w-4 h-4 text-emerald-400'
                        />
                    </Checkbox.Indicator>
                </Checkbox.Root>
                <label htmlFor="voiceChannel">Costumo me conectar ao chat de voz</label>
              </div>

              <footer className='mt-4 flex justify-end items-center gap-4'>
                <Dialog.Close
                  type="button"
                  className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600 transition-all duration-300'
                >
                  Cancelar
                </Dialog.Close>
                <button
                  className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600 transition-all duration-300'
                  type="submit"
                >
                  <GameController
                    size={24}
                  />
                  Encontrar duo
                </button>
              </footer>

            </form>
          </Dialog.Content>
        </Dialog.Portal>
    )
}