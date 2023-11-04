import { WhiteCard } from '../../../components';
import { useBearStore } from '../../../stores';

export function PandaBears() {
  const pandaBears = useBearStore((state) => state.pandaBears);
  const increasePandaBears = useBearStore((state) => state.increasePandaBears);

  return (
    <WhiteCard centered>
      <h2>Osos Polares</h2>

      <div className='flex flex-col md:flex-row'>
        <button onClick={() => increasePandaBears(1)}> +1</button>
        <span className='text-3xl mx-2 lg:mx-10'> {pandaBears} </span>
        <button onClick={() => increasePandaBears(-1)}>-1</button>
      </div>
    </WhiteCard>
  );
}
