import { WhiteCard } from '../../../components';
import { useBearStore } from '../../../stores';

export function PolarBears() {
  const polarBears = useBearStore((state) => state.polarBears);
  const increasePolarBears = useBearStore((state) => state.increasePolarBears);

  return (
    <WhiteCard centered>
      <h2>Osos Pandas</h2>

      <div className='flex flex-col md:flex-row'>
        <button onClick={() => increasePolarBears(1)}> +1</button>
        <span className='text-3xl mx-2 lg:mx-10'> {polarBears} </span>
        <button onClick={() => increasePolarBears(-1)}>-1</button>
      </div>
    </WhiteCard>
  );
}
