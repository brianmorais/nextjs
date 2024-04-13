import { Container } from '@/components/Container';
import { GameCard } from '@/components/GameCard';
import { Input } from '@/components/Input';
import { GameProps } from '@/utils/types/game';
import Image from 'next/image';
import Link from 'next/link';
import { BsArrowRightSquare } from 'react-icons/bs';

export default async function Home() {
  const dalyGame: GameProps = await getDalyGame();
  const data: GameProps[] = await getGamesData();
  console.log(dalyGame);
  return (
    <main className="w-full">
      <Container>
        <h1 className="text-center font-bold text-xl mt-8 mb-5">
          Separamos um jogo exclusivo para você
        </h1>
        <Link href={`/game/${dalyGame.id}`}>
          <section className="w-full bg-black rounded-lg">
            <div className="w-full max-h-96 h-96 relative rounded-lg">
              <div className="absolute z-20 bottom-0 p-3 flex justify-center items-center gap-2">
                <p className="font-bold text-xl text-white">{dalyGame.title}</p>
                <BsArrowRightSquare size={24} color="#fff" />
              </div>
              <Image
                src={dalyGame.image_url}
                alt={dalyGame.title}
                priority={true}
                quality={100}
                fill={true}
                className="max-h-96 object-cover rounded-lg opacity-50 hover:opacity-100 trasnition-all duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw"
              />
            </div>
          </section>
        </Link>
        <Input />
        <h2 className="text-lg font-bold mt-8 mb-5">Jogos para conhecer</h2>
        <section className="grid gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data.map((item: GameProps) => (
            <GameCard key={item.id} data={item} />
          ))}
        </section>
      </Container>
    </main>
  );
}

async function getDalyGame(): Promise<GameProps> {
  try {
    const response = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game_day`,
      { next: { revalidate: 320 } }
    );
    return response.json();
  } catch (error) {
    throw new Error('Filed to fetch data');
  }
}

async function getGamesData(): Promise<GameProps[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=games`,
      { next: { revalidate: 320 } }
    );
    return response.json();
  } catch (error) {
    throw new Error('Filed to fetch data');
  }
}
