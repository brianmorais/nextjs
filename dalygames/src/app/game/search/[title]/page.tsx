import { GameProps } from '@/utils/types/game';

export default async function Search(props: SearchProps) {
  const games = await getData(props.params.title);
  console.log(games);

  return <div>{}</div>;
}

interface SearchProps {
  params: {
    title: string;
  };
}

async function getData(title: string): Promise<GameProps[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game&title=${title}`,
      { cache: 'no-store' }
    );
    return response.json();
  } catch (error) {
    throw new Error('Filed to fetch data');
  }
}
