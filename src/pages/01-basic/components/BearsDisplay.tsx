import { useShallow } from 'zustand/react/shallow';

import { WhiteCard } from '../../../components';
import { useBearStore } from '../../../stores';

export function BearsDisplay() {
  const bears = useBearStore(useShallow((state) => state.bears));
  const doNothing = useBearStore((state) => state.doNothing);
  const addBear = useBearStore((state) => state.addBear);
  const clearBears = useBearStore((state) => state.clearBears);

  return (
    <WhiteCard>
      <h1>Osos</h1>
      <button onClick={doNothing}>No hacer nada</button>
      <button className='mt-2' onClick={addBear}>
        Agregar oso
      </button>
      <button className='mt-2' onClick={clearBears}>
        Limpiar osos
      </button>
      <pre>{JSON.stringify(bears, null, 2)}</pre>
    </WhiteCard>
  );
}
